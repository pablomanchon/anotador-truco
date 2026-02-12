// src/components/ads/AdsBanner.tsx
import React from "react";
import { View } from "react-native";
import mobileAds, { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";

type Props = {
  enabled?: boolean;
  adUnitId?: string;
  bottomOffset?: number;
};

const PROD_BANNER_ANDROID = "ca-app-pub-6542685410768650/4101326565";

function getBannerId(adUnitId?: string) {
  if (adUnitId) return adUnitId;
  return __DEV__ ? TestIds.BANNER : PROD_BANNER_ANDROID;
}

let initialized = false;

export default function AdsBanner({ enabled = true, adUnitId, bottomOffset = 0 }: Props) {
  React.useEffect(() => {
    if (initialized) return;
    initialized = true;

    mobileAds()
      .initialize()
      .catch(() => {});
  }, []);

  if (!enabled) return null;

  return (
    <View style={{ paddingBottom: bottomOffset }}>
      <BannerAd
        unitId={getBannerId(adUnitId)}
        size={BannerAdSize.BANNER} // ✅ sin SMART_BANNER
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      />
    </View>
  );
}
