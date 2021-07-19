<!--
 * @Author: 执念
 * @Date: 2021-07-19 11:22:46
 * @LastEditTime: 2021-07-19 12:20:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /blog/docs/ReactNative/react native 适配状态方案.md
-->
#### 适配 React Native 状态栏

- 目录结构如下

![image](https://user-images.githubusercontent.com/25763661/112955991-91011a80-9172-11eb-8fb1-8112c19b109f.png)

- AndroidContainer.js

```javascript
import React, {useContext} from 'react';

import {PageWraperContext} from './context';
import AndroidContainerFullScreenMode from './AndroidContainerFullScreenMode';
import AndroidContainerNormalMode from './AndroidContainerNormalMode';

export default function AndroidContainer() {
  const {isFullScreenPageMode} = useContext(PageWraperContext);

  return (
    <>
      {isFullScreenPageMode ? (
        <AndroidContainerFullScreenMode />
      ) : (
        <AndroidContainerNormalMode />
      )}
    </>
  );
}

```

- AndroidContainerFullScreenMode.js

```javascript

/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
import React, {useContext} from 'react';
import {View, StatusBar} from 'react-native';

import {PageWraperContext} from './context';
import {useGetPortraitState} from './useGetPortraitState';

export default function AndroidContinerFullScreenMode() {
  const {
    children,
    header,
    isFullScreen,
    isLandScapeAutoHiddenStatusBar,
    statusBarColor,
    reactNativeStatusBarProps,
  } = useContext(PageWraperContext);

  const isPortrait = useGetPortraitState();

  function handleHiddenStatusBar(isFullScreen) {
    let isHiddenStatusBar = isFullScreen;
    if (!isPortrait && isLandScapeAutoHiddenStatusBar) {
      isHiddenStatusBar = true;
    }
    return isHiddenStatusBar;
  }

  const isHiddenStatusBar = handleHiddenStatusBar(isFullScreen);

  return (
    <>
      <View style={{flex: 1}}>{children}</View>
      <>
        <StatusBar
          translucent={true}
          hidden={isHiddenStatusBar}
          backgroundColor={statusBarColor}
          {...reactNativeStatusBarProps}
        />
        {isFullScreen ? (
          <View
            style={{
              position: 'absolute',
              paddingTop: isHiddenStatusBar ? 0 : StatusBar.currentHeight,
              width: '100%',
              backgroundColor: statusBarColor,
            }}>
            {header}
          </View>
        ) : null}
      </>
    </>
  );
}

```

- AndroidContainerNormalMode.js

```javascript
import React, {useContext} from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';

import {PageWraperContext} from './context';
import {useGetPortraitState} from './useGetPortraitState';

const statusBarHeight = StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  childrenConatiner: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default function AndroidContainerNormalMode() {
  const {
    children,
    header,
    statusBarColor,
    reactNativeStatusBarProps,
    isLandScapeAutoHiddenStatusBar,
  } = useContext(PageWraperContext);

  const isPortrait = useGetPortraitState();

  /**
   * 在普通模式下，状态栏只有在用户设定了在横屏的时候自动隐藏状态栏时，状态栏才会在横屏的时候被隐藏
   * 其它情况下将一直显示状态栏
   */
  const isHiddenStatusBar = isLandScapeAutoHiddenStatusBar && !isPortrait;

  const containerStyle = [
    styles.container,
    {
      backgroundColor: statusBarColor,
      paddingTop: isHiddenStatusBar ? 0 : statusBarHeight,
    },
  ];
  return (
    <View style={containerStyle}>
      <StatusBar
        translucent={false}
        hidden={isHiddenStatusBar || false}
        backgroundColor={statusBarColor}
        {...reactNativeStatusBarProps}
      />
      {header}
      <View style={styles.childrenConatiner}>{children}</View>
    </View>
  );
}

```

- IosContainer.js

```javascript

import React, {useContext} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';

import {PageWraperContext} from './context';
import IosContainerFullScreenMode from './IosContainerFullScreenMode';
import IosContainerNormalMode from './IosContainerNormalMode';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default function IosContainer() {
  const {
    isFullScreenPageMode,
    isFullScreen,
    reactNativeStatusBarProps,
  } = useContext(PageWraperContext);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={isFullScreen}
        {...reactNativeStatusBarProps}
      />
      {isFullScreenPageMode ? (
        <IosContainerFullScreenMode />
      ) : (
        <IosContainerNormalMode />
      )}
    </View>
  );
}
```

- IosFullScreenModeContainer.js

```javascript
/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';

import {PageWraperContext} from './context';
import {useGetPortraitState} from './useGetPortraitState';

const styles = StyleSheet.create({
  saveAreaContainer: {
    flex: 1,
    width: '100%',
    position: 'absolute',
  },
  childrenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default function IosFullScreenModeContainer() {
  const isPortraitState = useGetPortraitState();
  const {children, header, isFullScreen, statusBarColor} = useContext(
    PageWraperContext,
  );
  return (
    <>
      <View style={styles.childrenContainer}>{children}</View>
      {
        // 当处于横屏状态，并且没有隐藏状态栏的时候，显示的头部
        !isPortraitState && !isFullScreen ? (
          <View style={{position: 'absolute', width: '100%'}}>{header}</View>
        ) : null
      }

      {
        // 当处于横屏状态，并且没有隐藏状态栏的时候，显示的头部
        isPortraitState && !isFullScreen ? (
          <SafeAreaView
            style={[
              styles.saveAreaContainer,
              {backgroundColor: statusBarColor},
            ]}>
            {header}
          </SafeAreaView>
        ) : null
      }
    </>
  );
}

```

- IosContainerNormalMode.js

```javascript
import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {PageWraperContext} from './context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function IosContainerNormalMode() {
  const {children, header, safeAreaViewStyle, statusBarColor} = useContext(
    PageWraperContext,
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: statusBarColor},
        safeAreaViewStyle,
      ]}>
      {header}
      {children}
    </SafeAreaView>
  );
}

```

- useGetPortraitState.js

```javascript


import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

export function useGetPortraitState() {
  // 根据当前高度判断是否横屏
  function isPortrait(height, width) {
    let portraitState = true;
    if (height < width) {
      portraitState = false;
    }
    return portraitState;
  }

  const [portraitState, setPortraitState] = useState(() => {
    const {width, height} = Dimensions.get('window');
    return isPortrait(height, width);
  });

  useEffect(() => {
    function handleDimensionsChange({window}) {
      const {width, height} = window;
      setPortraitState(isPortrait(height, width));
    }

    Dimensions.addEventListener('change', handleDimensionsChange);

    return () => {
      Dimensions.removeEventListener('change', handleDimensionsChange);
    };
  });

  return portraitState;
}

```

- context.js

```javascript
import React from 'react';

export const PageWraperContext = React.createContext({
  isFullScreen: false,
  isLandScapeAutoHiddenStatusBar: false,
  header: <></>,
  statusBarColor: '#fff',
  isFullScreenPageMode: false,
  children: <></>,
  reactNativeStatusBarProps: {},
  safeAreaViewStyle: {},
});

```

- index.js

```javascript


/* eslint-disable no-shadow */
import React from 'react';
import {Platform} from 'react-native';

import {PageWraperContext} from './context';
import AndroidContainer from './AndroidContainer';
import IosContainer from './IosContainer';

const isIos = Platform.OS === 'ios';

export function PageWrapper({
  children,
  isFullScreen = false,
  isLandScapeAutoHiddenStatusBar = false,
  header = null,
  statusBarColor,
  isFullScreenPageMode = false,
  reactNativeStatusBarProps = {},
  safeAreaViewStyle = {},
}) {
  function getReactNativeStatusBarProps(reactNativeStatusBarProps) {
    const newProps = Object.assign({}, reactNativeStatusBarProps);
    if (newProps.hidden) {
      delete newProps.hidden;
    }
    return newProps;
  }

  const value = {
    children,
    isFullScreen,
    isLandScapeAutoHiddenStatusBar,
    header,
    statusBarColor,
    isFullScreenPageMode,
    reactNativeStatusBarProps: getReactNativeStatusBarProps(
      reactNativeStatusBarProps,
    ),
    safeAreaViewStyle,
  };

  return (
    <>
      <PageWraperContext.Provider value={value}>
        {isIos ? <IosContainer /> : <AndroidContainer />}
      </PageWraperContext.Provider>
    </>
  );
}

PageWrapper.defaultProps = {
  isFullScreen: false,
  isLandScapeAutoHiddenStatusBar: false,
  header: null,
  isFullScreenPageMode: false,
};

```


**使用**

```javascript

// 引入
import {PageWrapper} from '../../components/SafeAreaViewPlus';


  <PageWrapper
    header={<Header title="首页" style={{backgroundColor: '#F7C659'}} />}
    statusBarColor="#F7C659"
    isLandScapeAutoHiddenStatusBar={true}
    reactNativeStatusBarProps={{
      barStyle: 'light-content',
    }}>
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <Text>NormalScreenMode</Text>

      <Button title="Go Back" onPress={() => props.navigation.goBack()} />
    </View>
  </PageWrapper>
```

**效果图**

![image](https://user-images.githubusercontent.com/25763661/112957479-0de0c400-9174-11eb-9025-c07ca4d1602c.png)

