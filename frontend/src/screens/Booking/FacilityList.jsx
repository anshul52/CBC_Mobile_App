import React from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import data from '../../data/data.json';

const FacilityList = () => {
  const facilities = data.facilities;
  const renderPricing = pricingRules => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Pricing:</Text>
      {pricingRules.map((rule, idx) => (
        <Text key={idx} style={styles.detailText}>
          {rule.day_type_name} • {rule.start_time}–{rule.end_time} • $
          {rule.price} / {rule.unit}
        </Text>
      ))}
    </View>
  );

  const renderOperatingHours = hours => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Operating Hours:</Text>
      {hours.map((hour, idx) => (
        <Text key={idx} style={styles.detailText}>
          {hour.day_type_name} • {hour.open_time}–{hour.close_time}
        </Text>
      ))}
    </View>
  );

  const renderEquipment = equipmentRentals => {
    if (!equipmentRentals || equipmentRentals.length === 0) return null;
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Equipment Rentals:</Text>
        {equipmentRentals.map((item, idx) => (
          <Text key={idx} style={styles.detailText}>
            {item.item_name} • ${item.price}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        {facilities.map(facility => (
          <View key={facility.facility_id} style={styles.card}>
            <Text style={styles.facilityName}>{facility.facility_name}</Text>
            {renderOperatingHours(facility.operating_hours)}
            {renderPricing(facility.pricing_rules)}
            {renderEquipment(facility.equipment_rentals)}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  facilityName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 8,
  },
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#4b5563',
    marginBottom: 2,
  },
});

export default FacilityList;
