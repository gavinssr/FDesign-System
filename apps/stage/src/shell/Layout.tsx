import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useEffect, useRef, useState } from 'react';

import { componentLinks, getNavPageByUrl, getParentGroupByChildKey } from './componentLinks';

type LayoutChildren = JSX.Element | JSX.Element[] | string | number | null;
const STAGE_EXPANDED_GROUPS_STORAGE_KEY = '__stage-expanded-groups';
const STAGE_PATHNAME_CHANGED_EVENT = '__stage-pathname-changed';

function readCurrentPathname(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  const { pathname, hash } = window.location;

  // Taro H5 默认 hash 路由；同时兼容未来可能切换到 history 路由
  if (hash && hash.length > 1) {
    return hash.replace(/^#/, '').split('?')[0] ?? '';
  }

  return pathname ?? '';
}

let historyPatched = false;

function patchHistoryOnce() {
  if (historyPatched || typeof window === 'undefined') {
    return;
  }

  historyPatched = true;

  const { history } = window;
  const emit = () => {
    window.dispatchEvent(new Event(STAGE_PATHNAME_CHANGED_EVENT));
  };

  const wrap = (method: 'pushState' | 'replaceState') => {
    const original = history[method];
    history[method] = function patched(data: any, unused: string, url?: string | URL | null) {
      const result = original.call(history, data, unused, url);
      emit();
      return result;
    };
  };

  wrap('pushState');
  wrap('replaceState');
}

function useCurrentPathname(): string {
  const [pathname, setPathname] = useState(() => readCurrentPathname());

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    patchHistoryOnce();

    const update = () => {
      setPathname((prev) => {
        const next = readCurrentPathname();
        return prev === next ? prev : next;
      });
    };

    window.addEventListener('popstate', update);
    window.addEventListener('hashchange', update);
    window.addEventListener(STAGE_PATHNAME_CHANGED_EVENT, update);

    update();

    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener('hashchange', update);
      window.removeEventListener(STAGE_PATHNAME_CHANGED_EVENT, update);
    };
  }, []);

  return pathname;
}

interface LayoutProps {
  children: LayoutChildren;
}

export function Layout({ children }: LayoutProps) {
  const pathname = useCurrentPathname();
  const activeNavKey = getNavPageByUrl(pathname)?.key;
  const activeGroupKey = activeNavKey ? getParentGroupByChildKey(activeNavKey)?.key : undefined;
  const sidebarRef = useRef<HTMLElement | null>(null);
  const navListRef = useRef<HTMLElement | null>(null);
  const navScrollSpacerRef = useRef<HTMLElement | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
    const storedExpandedGroups = Taro.getStorageSync(STAGE_EXPANDED_GROUPS_STORAGE_KEY);
    return storedExpandedGroups && typeof storedExpandedGroups === 'object'
      ? (storedExpandedGroups as Record<string, boolean>)
      : {};
  });

  useEffect(() => {
    Taro.setStorageSync(STAGE_EXPANDED_GROUPS_STORAGE_KEY, expandedGroups);
  }, [expandedGroups]);

  useEffect(() => {
    if (!activeGroupKey) {
      return;
    }

    setExpandedGroups((prev) => {
      if (prev[activeGroupKey] !== undefined) {
        return prev;
      }

      return { ...prev, [activeGroupKey]: true };
    });
  }, [activeGroupKey]);

  const [isNavOverflowing, setIsNavOverflowing] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const sidebarElement = sidebarRef.current;
    const navListElement = navListRef.current;

    if (!sidebarElement || !navListElement) {
      return;
    }

    const measureOverflow = () => {
      const spacerHeight = isNavOverflowing ? navScrollSpacerRef.current?.offsetHeight ?? 0 : 0;
      const navContentHeight = navListElement.scrollHeight - spacerHeight;
      const nextIsOverflowing = navContentHeight > sidebarElement.clientHeight + 1;

      setIsNavOverflowing((prev) => (prev === nextIsOverflowing ? prev : nextIsOverflowing));
    };

    measureOverflow();

    const resizeObserver = new window.ResizeObserver(measureOverflow);
    resizeObserver.observe(sidebarElement);
    resizeObserver.observe(navListElement);
    window.addEventListener('resize', measureOverflow);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measureOverflow);
    };
  }, [isNavOverflowing]);

  const handleNavigate = (url: string, isActive: boolean) => {
    if (isActive) {
      return;
    }

    void Taro.reLaunch({ url });
  };

  const handleGroupClick = (
    groupKey: string,
    firstChildUrl: string,
    isExpanded: boolean,
    hasActiveChild: boolean,
  ) => {
    if (isExpanded) {
      setExpandedGroups((prev) => ({
        ...prev,
        [groupKey]: false,
      }));
      return;
    }

    setExpandedGroups((prev) => ({
      ...prev,
      [groupKey]: true,
    }));

    if (!hasActiveChild) {
      handleNavigate(firstChildUrl, false);
    }
  };

  return (
    <View className="__stage-layout">
      <View className="__stage-header">
        <View className="__stage-headerBrand">
          <View className="__stage-headerLogo" aria-hidden />
          <Text className="__stage-headerTitle">FDesign System</Text>
        </View>
      </View>
      <View
        ref={sidebarRef}
        className="__stage-sidebar"
        data-nav-overflowing={isNavOverflowing ? 'true' : 'false'}
      >
        <View ref={navListRef} className="__stage-navList">
          {componentLinks.map((item) => {
            if (item.type === 'group') {
              const isExpanded = expandedGroups[item.key] ?? item.key === activeGroupKey;
              const isGroupActive = item.key === activeGroupKey;
              const isExpandedGroupActive = isExpanded && isGroupActive;

              return (
                <View key={item.key} className="__stage-navGroup">
                  <View
                    className={`__stage-navLink __stage-navLinkGroup ${isExpandedGroupActive ? '__stage-navLinkGroupActive' : ''}`}
                    role="button"
                    onClick={() => {
                      handleGroupClick(item.key, item.children[0].url, isExpanded, isGroupActive);
                    }}
                  >
                    <View className="__stage-navLinkText">
                      <Text className="__stage-navLinkLabelSizer">{item.label}</Text>
                      <Text className="__stage-navLinkLabel">{item.label}</Text>
                    </View>
                    <View className="__stage-navArrowWrap">
                      <View
                        className={`__stage-navArrow ${isExpanded ? '__stage-navArrowExpanded' : ''}`}
                      />
                    </View>
                  </View>
                  <View
                    className={`__stage-navSubList ${isExpanded ? '' : '__stage-navSubListCollapsed'}`}
                  >
                    {item.children.map((child) => {
                      const isActive = child.key === activeNavKey;

                      return (
                        <View
                          key={child.key}
                          className={`__stage-navLink __stage-navSubLink ${isActive ? '__stage-navLinkActive' : ''}`}
                          role="link"
                          onClick={() => {
                            handleNavigate(child.url, isActive);
                          }}
                        >
                          <View className="__stage-navLinkText">
                            <Text className="__stage-navLinkLabelSizer">{child.label}</Text>
                            <Text className="__stage-navLinkLabel">{child.label}</Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            }

            const isActive = item.key === activeNavKey;

            return (
              <View
                key={item.key}
                className={`__stage-navLink ${isActive ? '__stage-navLinkActive' : ''}`}
                role="link"
                onClick={() => {
                  handleNavigate(item.url, isActive);
                }}
              >
                <View className="__stage-navLinkText">
                  <Text className="__stage-navLinkLabelSizer">{item.label}</Text>
                  <Text className="__stage-navLinkLabel">{item.label}</Text>
                </View>
              </View>
            );
          })}
          <View
            ref={navScrollSpacerRef}
            className={`__stage-navScrollSpacer ${isNavOverflowing ? '__stage-navScrollSpacerActive' : ''}`}
            aria-hidden
          />
        </View>
      </View>
      <View className="__stage-main">{children}</View>
    </View>
  );
}
