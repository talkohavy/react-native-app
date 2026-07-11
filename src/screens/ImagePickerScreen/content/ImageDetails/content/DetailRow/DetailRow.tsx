import { StyleSheet, Text, View } from 'react-native';

type DetailRowProps = {
  icon: string;
  label: string;
  value: string;
  mono?: boolean;
  isLast?: boolean;
};

export default function DetailRow({ icon, label, value, mono, isLast }: DetailRowProps) {
  return (
    <View style={[styles.row, !isLast && styles.rowDivider]}>
      <View style={styles.rowIconWrap}>
        <Text style={styles.rowIcon}>{icon}</Text>
      </View>

      <View style={styles.rowBody}>
        <Text style={styles.rowLabel}>{label}</Text>

        <Text style={[styles.rowValue, mono && styles.rowValueMono]} numberOfLines={2} ellipsizeMode='middle'>
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F3F4F6',
  },
  rowIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  rowIcon: {
    fontSize: 16,
  },
  rowBody: {
    flex: 1,
    gap: 2,
  },
  rowLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  rowValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  rowValueMono: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#374151',
  },
});
