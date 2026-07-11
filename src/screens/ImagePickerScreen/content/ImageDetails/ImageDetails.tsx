import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import DetailRow from './content/DetailRow';
import SelectedImage from './content/SelectedImage';
import { ACCENT, BG } from './logic/constants';
import { formatBytes } from './logic/utils/formatBytes';
import { formatExifDate } from './logic/utils/formatExifDate';
import type { PickedAsset } from '../../logic/useImagePickerScreenLogic';

type ImageDetailsProps = {
  asset: PickedAsset;
  isLoading: boolean;
  onClear: () => void;
  onPickNew: () => void;
};

export default function ImageDetails(props: ImageDetailsProps) {
  const { asset, isLoading, onClear, onPickNew } = props;

  const aspectRatio = asset.width > 0 && asset.height > 0 ? asset.width / asset.height : 1;
  const exif = asset.exif as Record<string, any> | null;
  const dateTaken = formatExifDate(exif?.DateTimeOriginal ?? exif?.DateTime);
  const makeModel = exif?.Make && exif?.Model ? `${exif.Make as string} ${exif.Model as string}` : null;

  return (
    <View style={styles.root}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Image */}
        <SelectedImage asset={asset} aspectRatio={aspectRatio} />

        {/* File name headline */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.headline}>
          <Text style={styles.fileName} numberOfLines={2}>
            {asset.fileName ?? 'image'}
          </Text>

          <Text style={styles.fileMeta}>
            {formatBytes(asset.fileSize)}
            {asset.mimeType ? `  ·  ${asset.mimeType}` : ''}
          </Text>
        </Animated.View>

        {/* Details card */}
        <Animated.View entering={FadeInUp.delay(200).duration(500)} style={styles.card}>
          <Text style={styles.cardTitle}>Details</Text>

          <DetailRow icon='📁' label='File Name' value={asset.fileName ?? 'Unknown'} />
          <DetailRow icon='📐' label='Dimensions' value={`${asset.width} × ${asset.height} px`} />
          <DetailRow icon='💾' label='File Size' value={formatBytes(asset.fileSize)} />
          <DetailRow icon='🗂️' label='MIME Type' value={asset.mimeType ?? asset.type ?? 'Unknown'} mono />
          {dateTaken && <DetailRow icon='📅' label='Date Taken' value={dateTaken} />}
          {makeModel && <DetailRow icon='📷' label='Camera' value={makeModel} />}
          <DetailRow icon='🔗' label='URI' value={asset.uri} mono isLast />
        </Animated.View>

        {/* Bottom spacing so scroll clears the action bar */}
        <View style={styles.bottomGap} />
      </ScrollView>

      {/* Floating action bar */}
      <Animated.View entering={FadeInUp.delay(300).duration(500)} style={styles.actionBar}>
        <Pressable onPress={onClear} style={({ pressed }) => [styles.clearBtn, pressed && styles.btnPressed]}>
          <Text style={styles.clearBtnText}>Clear</Text>
        </Pressable>

        <Pressable
          onPress={onPickNew}
          disabled={isLoading}
          style={({ pressed }) => [styles.pickBtn, (pressed || isLoading) && styles.btnPressed]}
        >
          {isLoading ? (
            <ActivityIndicator color='#FFFFFF' size='small' />
          ) : (
            <Text style={styles.pickBtnText}>Pick Another</Text>
          )}
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },
  headline: {
    gap: 4,
    paddingHorizontal: 4,
  },
  fileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.3,
  },
  fileMeta: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 4,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  bottomGap: {
    height: 96,
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 28,
    backgroundColor: 'rgba(248,249,255,0.92)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
  },
  clearBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  clearBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  pickBtn: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    paddingVertical: 14,
    backgroundColor: ACCENT,
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  pickBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  btnPressed: {
    opacity: 0.75,
  },
});
