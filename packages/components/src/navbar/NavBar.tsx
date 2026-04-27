import { Text, View } from '@tarojs/components';
import { colors, referenceColors } from '@fdesign/tokens';
import { useMemo, useState } from 'react';
import type { CSSProperties, ChangeEvent, KeyboardEvent } from 'react';

import type { NavBarAction, NavBarProps, NavBarSearchProps } from './NavBar.types';
import './NavBar.module.css';
import { shouldUseCssVariables } from '../styleRuntime';

type NavBarStyleVars = CSSProperties &
  Record<
    | '--navbar-text-primary'
    | '--navbar-text-tertiary'
    | '--navbar-text-disabled'
    | '--navbar-primary'
    | '--navbar-marketing'
    | '--navbar-page'
    | '--navbar-white',
    string
  >;

function BackIcon() {
  return <View className="fd-navbar-backIcon" aria-hidden="true" />;
}

function SearchIcon() {
  return <View className="fd-navbar-searchIcon" aria-hidden="true" />;
}

const actionIconClassMap = {
  search: 'fd-navbar-actionAssetIcon fd-navbar-actionSearchIcon',
  cart: 'fd-navbar-actionAssetIcon fd-navbar-actionCartIcon',
  more: 'fd-navbar-actionAssetIcon fd-navbar-actionMoreIcon',
  'customer-service': 'fd-navbar-actionAssetIcon fd-navbar-actionCustomerServiceIcon',
  bill: 'fd-navbar-actionAssetIcon fd-navbar-actionBillIcon',
  'credit-increase': 'fd-navbar-actionAssetIcon fd-navbar-actionCreditIncreaseIcon',
  support: 'fd-navbar-actionAssetIcon fd-navbar-actionCustomerServiceIcon',
  calendar: 'fd-navbar-actionAssetIcon fd-navbar-actionBillIcon',
  wallet: 'fd-navbar-actionAssetIcon fd-navbar-actionCreditIncreaseIcon',
} as const satisfies Record<NonNullable<NavBarAction['icon']>, string>;

function ActionIcon({ icon }: { icon: NonNullable<NavBarAction['icon']> }) {
  return <View className={actionIconClassMap[icon]} aria-hidden="true" />;
}

function IconAction({ action, withLabel = false }: { action: NavBarAction; withLabel?: boolean }) {
  return (
    <View
      className={withLabel ? 'fd-navbar-labelIconAction' : 'fd-navbar-iconAction'}
      role="button"
      aria-label={action.label ?? action.icon}
      onClick={action.onPress}
    >
      {action.icon ? <ActionIcon icon={action.icon} /> : null}
      {withLabel ? <Text className="fd-navbar-actionIconLabel">{action.label}</Text> : null}
    </View>
  );
}

function CloseCircle({
  onPress,
  label,
  inline = false,
}: {
  onPress?: () => void;
  label: string;
  inline?: boolean;
}) {
  return (
    <View
      className={inline ? 'fd-navbar-closeCircle fd-navbar-closeCircleInline' : 'fd-navbar-closeCircle'}
      role="button"
      aria-label={label}
      onClick={onPress}
    >
    </View>
  );
}

function useSearchState(search?: NavBarSearchProps) {
  const [innerValue, setInnerValue] = useState(search?.value ?? '');
  const value = search?.value ?? innerValue;
  const updateValue = (nextValue: string) => {
    if (search?.value === undefined) {
      setInnerValue(nextValue);
    }
    search?.onValueChange?.(nextValue);
  };

  return [value, updateValue] as const;
}

function NavBarSearch({
  search,
  extraAction,
  onBack,
}: {
  search: NavBarSearchProps;
  extraAction?: NavBarAction;
  onBack?: () => void;
}) {
  const [value, setValue] = useSearchState(search);
  const [isFocused, setIsFocused] = useState(Boolean(search.autoFocus));
  const tags = search.tags ?? [];
  const hasTags = tags.length > 0;
  const hasValue = value.length > 0;
  const showInlineClear = hasValue || hasTags;
  const placeholder = search.placeholder ?? '输入文本';
  const inputClassName =
    isFocused && !hasValue ? 'fd-navbar-searchInput fd-navbar-searchInputFocusedEmpty' : 'fd-navbar-searchInput';

  const clearAndFocus = () => {
    setValue('');
    search.onClear?.();
  };
  const submit = () => {
    search.onSubmit?.(value);
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };
  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submit();
    }
  };

  return (
    <View className={extraAction ? 'fd-navbar-searchRow fd-navbar-searchRowWithAction' : 'fd-navbar-searchRow'}>
      <View className="fd-navbar-searchMain">
        <View className="fd-navbar-backButton" role="button" aria-label="返回上一页" onClick={onBack}>
          <BackIcon />
        </View>
        <View className={hasTags ? 'fd-navbar-searchBox fd-navbar-searchBoxTags' : 'fd-navbar-searchBox'}>
          <SearchIcon />
          {hasTags ? (
            <View className="fd-navbar-tagList">
              {tags.map((tag) => (
                <View className="fd-navbar-searchTag" key={tag.key}>
                  <Text className="fd-navbar-searchTagText">{tag.label}</Text>
                  <View
                    className="fd-navbar-tagRemove"
                    role="button"
                    aria-label={`删除${tag.label}`}
                    onClick={() => search.onTagRemove?.(tag.key)}
                  >
                    <View className="fd-navbar-tagRemoveLine fd-navbar-tagRemoveLineA" />
                    <View className="fd-navbar-tagRemoveLine fd-navbar-tagRemoveLineB" />
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View className="fd-navbar-inputWrap">
              <input
                className={inputClassName}
                value={value}
                placeholder={placeholder}
                autoFocus={search.autoFocus}
                onFocus={() => {
                  setIsFocused(true);
                  search.onFocus?.();
                }}
                onBlur={() => setIsFocused(false)}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
              />
            </View>
          )}
          {showInlineClear ? (
            <CloseCircle label="清空搜索内容" onPress={clearAndFocus} inline={Boolean(search.showSubmit && !hasTags)} />
          ) : null}
          {search.showSubmit ? (
            <View className="fd-navbar-searchSubmit" role="button" onClick={submit}>
              <View className="fd-navbar-searchDivider" />
              <Text className="fd-navbar-searchSubmitText">搜索</Text>
            </View>
          ) : null}
        </View>
      </View>
      {extraAction ? <IconAction action={extraAction} /> : null}
    </View>
  );
}

export function NavBar({
  title,
  actions,
  textAction,
  tabs,
  activeTabKey,
  defaultActiveTabKey,
  search,
  searchExtraAction,
  onBack,
  onTabChange,
  children,
}: NavBarProps) {
  const useCssVariables = shouldUseCssVariables();
  const [innerActiveTab, setInnerActiveTab] = useState(defaultActiveTabKey ?? tabs?.[0]?.key);
  const resolvedActiveTab = activeTabKey ?? innerActiveTab;
  const styleVars: NavBarStyleVars = {
    '--navbar-text-primary': colors.semantic.text.primary,
    '--navbar-text-tertiary': colors.semantic.text.tertiary,
    '--navbar-text-disabled': colors.semantic.text.disabled,
    '--navbar-primary': colors.semantic.action.primary.background,
    '--navbar-marketing': referenceColors.brand.pink[8],
    '--navbar-page': colors.semantic.surface.page,
    '--navbar-white': colors.semantic.surface.base,
  };
  const resolvedActions = useMemo(() => actions?.slice(0, 3) ?? [], [actions]);

  const selectTab = (key: string) => {
    if (activeTabKey === undefined) {
      setInnerActiveTab(key);
    }
    onTabChange?.(key);
  };

  return (
    <View className="fd-navbar-root" style={useCssVariables ? styleVars : undefined}>
      {search ? (
        <NavBarSearch search={search} extraAction={searchExtraAction} onBack={onBack} />
      ) : (
        <View className="fd-navbar-bar">
          <View className={tabs ? 'fd-navbar-left fd-navbar-leftTabs' : 'fd-navbar-left'}>
            <View className="fd-navbar-backButton" role="button" aria-label="返回上一页" onClick={onBack}>
              <BackIcon />
            </View>
            {tabs ? (
              <View className="fd-navbar-tabs" role="tablist">
                {tabs.map((tab) => {
                  const selected = tab.key === resolvedActiveTab;
                  return (
                    <View
                      className={selected ? 'fd-navbar-tab fd-navbar-tabActive' : 'fd-navbar-tab'}
                      key={tab.key}
                      role="tab"
                      aria-selected={selected}
                      onClick={() => selectTab(tab.key)}
                    >
                      <Text className="fd-navbar-tabText">{tab.label}</Text>
                      {tab.badge !== undefined ? <Text className="fd-navbar-badge">{tab.badge}</Text> : null}
                    </View>
                  );
                })}
              </View>
            ) : title ? (
              <Text className="fd-navbar-title">{title}</Text>
            ) : null}
          </View>
          {textAction ? (
            <View className="fd-navbar-textAction" role="button" onClick={textAction.onPress}>
              <Text className="fd-navbar-textActionLabel">{textAction.label}</Text>
            </View>
          ) : resolvedActions.length > 0 ? (
            <View className={title ? 'fd-navbar-actions fd-navbar-actionsWithLabels' : 'fd-navbar-actions'}>
              {resolvedActions.map((action) => (
                <IconAction action={action} key={action.key} withLabel={Boolean(title)} />
              ))}
            </View>
          ) : null}
        </View>
      )}
      {children}
    </View>
  );
}
