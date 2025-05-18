import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Back from '../../assets/Booking/Back.svg';
import {useNavigation} from '@react-navigation/native';
import CalendarComponent from '../../component/DateTimePageCompo/CalendarComponent';

const DateTimePage = ({route}) => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [startTime, setStartTime] = useState('08:00 AM');
  const [endTime, setEndTime] = useState('09:00 AM');
  const [showStartTimeDropdown, setShowStartTimeDropdown] = useState(false);
  const [showEndTimeDropdown, setShowEndTimeDropdown] = useState(false);
  const [availableEndTimes, setAvailableEndTimes] = useState([]);
  const [facilityDetails, setFacilityDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPriceSummary, setShowPriceSummary] = useState(false);
  const [priceSummary, setPriceSummary] = useState({
    freeHours: 0,
    paidHours: 0,
    totalAmount: 0,
  });

  // Convert 24h time to 12h format
  const convertTo12Hour = time24 => {
    const [hours, minutes] = time24.split(':');
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  };

  // Convert 12h time to 24h format
  const convertTo24Hour = time12 => {
    const [time, period] = time12.split(' ');
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);

    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, '0')}:${minutes}:00`;
  };

  // Get day name from date
  const getDayName = date => {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[date.getDay()];
  };

  const fetchFacilities = async selectedDay => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        console.warn('No token found');
        return;
      }

      const facilityId = 1; // Default facility ID for testing
      setLoading(true);

      const response = await fetch(
        `http://10.0.2.2:8085/api/sports/sports-details-day-wise-and-facility-wise?day=${selectedDay}&facilityId=${facilityId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        setFacilityDetails(data);
        // Reset times when facility details change
        if (data.sportDetails) {
          setStartTime(convertTo12Hour(data.sportDetails.open_time));
          setEndTime(
            convertTo12Hour(data.sportDetails.open_time.replace('00:', '01:')),
          );
        }
      } else {
        console.error('Failed to fetch:', data.message);
      }
    } catch (error) {
      console.error('Error fetching facilities:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle date selection
  const handleDateSelection = date => {
    setSelectedDate(date);
    const selectedDayName = getDayName(new Date(2024, 4, date)); // Using May 2024 as example
    fetchFacilities(selectedDayName);
  };

  // Check if time slot is free
  const isTimeSlotFree = time24 => {
    if (!facilityDetails?.sportDetails?.pricing_rules) return false;
    const hour = parseInt(time24.split(':')[0]);

    const freeRule = facilityDetails.sportDetails.pricing_rules.find(r => {
      const startHour = parseInt(r.start_time.split(':')[0]);
      const endHour = parseInt(r.end_time.split(':')[0]);
      return hour >= startHour && hour < endHour && parseFloat(r.price) === 0;
    });

    return !!freeRule;
  };

  // Get price for a specific hour
  const getPriceForHour = hour => {
    const rule = facilityDetails.sportDetails.pricing_rules.find(r => {
      const startHour = parseInt(r.start_time.split(':')[0]);
      const endHour = parseInt(r.end_time.split(':')[0]);
      return hour >= startHour && hour < endHour;
    });
    return rule ? parseFloat(rule.price) : 0;
  };

  // Generate time slots based on facility hours
  useEffect(() => {
    if (facilityDetails?.sportDetails) {
      const {open_time, close_time} = facilityDetails.sportDetails;
      const startHour = parseInt(open_time.split(':')[0]);
      const endHour = parseInt(close_time.split(':')[0]);

      const slots = [];
      for (let hour = startHour; hour < endHour; hour++) {
        const time24 = `${hour.toString().padStart(2, '0')}:00:00`;
        slots.push(convertTo12Hour(time24));
      }
      setAvailableEndTimes(slots);
    }
  }, [facilityDetails]);

  // Auto calculate price when end time changes
  useEffect(() => {
    if (startTime && endTime) {
      calculatePrice();
    }
  }, [endTime]);

  // Filter available end times based on start time
  const getFilteredEndTimes = () => {
    const startHour = parseInt(convertTo24Hour(startTime).split(':')[0]);
    return availableEndTimes.filter(time => {
      const hour = parseInt(convertTo24Hour(time).split(':')[0]);
      return hour > startHour;
    });
  };

  // Calculate price for selected time slot
  const calculatePrice = () => {
    if (!facilityDetails) return;

    const start24 = convertTo24Hour(startTime);
    const end24 = convertTo24Hour(endTime);

    let freeHours = 0;
    let paidHours = 0;
    let totalAmount = 0;

    // Calculate hours between start and end time
    const startHour = parseInt(start24.split(':')[0]);
    const endHour = parseInt(end24.split(':')[0]);

    for (let hour = startHour; hour < endHour; hour++) {
      const price = getPriceForHour(hour);
      if (price === 0) {
        freeHours++;
      } else {
        paidHours++;
        totalAmount += price;
      }
    }

    setPriceSummary({
      freeHours,
      paidHours,
      totalAmount,
    });
    setShowPriceSummary(true);
  };

  // Render time slot with free tag and price
  const renderTimeSlot = (time, isSelected, onPress) => {
    const time24 = convertTo24Hour(time);
    const hour = parseInt(time24.split(':')[0]);
    const isFree = isTimeSlotFree(time24);
    const price = getPriceForHour(hour);

    return (
      <TouchableOpacity
        key={time}
        style={[styles.timeOption, isSelected && styles.selectedTimeOption]}
        onPress={onPress}>
        <View style={styles.timeSlotContent}>
          <Text
            style={[styles.timeText, isSelected && styles.selectedTimeText]}>
            {time}
          </Text>
          {isFree ? (
            <View style={styles.freeTag}>
              <Text style={styles.freeTagText}>Free</Text>
            </View>
          ) : (
            <Text style={styles.priceText}>£{price.toFixed(2)}/hr</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // Initial fetch
  useEffect(() => {
    const currentDay = getDayName(new Date());
    fetchFacilities(currentDay);
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/Booking/Group.png')}
      style={styles.background}
      resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Back width={13} height={13} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Date & Time</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.mainContainer}>
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
            nestedScrollEnabled={true}>
            <View style={styles.courtInfoCard}>
              {facilityDetails?.sportDetails && (
                <Text style={styles.facilityName}>
                  {facilityDetails.sportDetails.facility_name}
                </Text>
              )}
            </View>

            <CalendarComponent
              onDateSelect={handleDateSelection}
              selectedDate={selectedDate}
            />

            <Text style={styles.sectionTitle}>Choose Available Time</Text>

            <View style={styles.timeSelectionContainer}>
              <View style={styles.timeColumn}>
                <Text style={styles.timeLabel}>Start</Text>
                <TouchableOpacity
                  style={styles.timeSelector}
                  onPress={() => {
                    setShowStartTimeDropdown(!showStartTimeDropdown);
                    setShowEndTimeDropdown(false);
                  }}>
                  <Text style={styles.selectedTimeDisplay}>{startTime}</Text>
                </TouchableOpacity>
                {showStartTimeDropdown && (
                  <ScrollView
                    style={styles.timeDropdownContainer}
                    nestedScrollEnabled={true}>
                    {availableEndTimes.map(time =>
                      renderTimeSlot(time, time === startTime, () => {
                        setStartTime(time);
                        setShowStartTimeDropdown(false);
                        // Reset end time if it's before new start time
                        const endHour = parseInt(
                          convertTo24Hour(endTime).split(':')[0],
                        );
                        const startHour = parseInt(
                          convertTo24Hour(time).split(':')[0],
                        );
                        if (endHour <= startHour) {
                          const nextHour = `${(startHour + 1)
                            .toString()
                            .padStart(2, '0')}:00:00`;
                          setEndTime(convertTo12Hour(nextHour));
                        }
                      }),
                    )}
                  </ScrollView>
                )}
              </View>

              <View style={styles.timeColumn}>
                <Text style={styles.timeLabel}>End</Text>
                <TouchableOpacity
                  style={styles.timeSelector}
                  onPress={() => {
                    setShowEndTimeDropdown(!showEndTimeDropdown);
                    setShowStartTimeDropdown(false);
                  }}>
                  <Text style={styles.selectedTimeDisplay}>{endTime}</Text>
                </TouchableOpacity>
                {showEndTimeDropdown && (
                  <ScrollView
                    style={styles.timeDropdownContainer}
                    nestedScrollEnabled={true}>
                    {getFilteredEndTimes().map(time =>
                      renderTimeSlot(time, time === endTime, () => {
                        setEndTime(time);
                        setShowEndTimeDropdown(false);
                      }),
                    )}
                  </ScrollView>
                )}
              </View>
            </View>

            {showPriceSummary && (
              <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>Price Summary</Text>
                <View style={styles.summaryRow}>
                  <Text>Free Hours:</Text>
                  <Text>{priceSummary.freeHours} hours</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text>Paid Hours:</Text>
                  <Text>
                    {priceSummary.paidHours} hours (£
                    {priceSummary.totalAmount.toFixed(2)})
                  </Text>
                </View>
                <View style={[styles.summaryRow, styles.totalRow]}>
                  <Text style={styles.totalText}>Total Amount:</Text>
                  <Text style={styles.totalText}>
                    £{priceSummary.totalAmount.toFixed(2)}
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>

          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue Booking</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#00A0E0',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'Inter_24pt-SemiBold',
  },
  placeholder: {
    width: 40,
  },
  mainContainer: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 45,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  contentContainer: {
    paddingTop: 25,
    paddingHorizontal: 25,
    paddingBottom: 150,
  },
  courtInfoCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  courtImage: {
    width: '100%',
    height: 152,
    borderRadius: 8,
  },
  courtDetails: {
    flex: 1,
    marginLeft: 16,
  },
  courtName: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: 'Satoshi-Bold',
  },
  availabilityText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    fontFamily: 'Satoshi-Regular',
  },
  availabilityDetails: {
    flexDirection: 'row',
    marginBottom: 8,
    fontFamily: 'Satoshi-Variable',
  },
  availabilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    fontFamily: 'Satoshi-Variable',
  },
  availabilityItemText: {
    marginLeft: 4,
    color: '#000',
    fontSize: 12,
    fontFamily: 'Satoshi-Regular',
  },
  priceText: {
    color: '#FF9800',
    fontSize: 14,
    fontWeight: '500',
  },
  calendarContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthText: {
    fontSize: 18,
    fontWeight: '600',
  },
  calendarGrid: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  calendarCell: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayOfWeekText: {
    color: '#666',
    fontWeight: '500',
  },
  calendarDayText: {
    fontSize: 16,
    color: '#333',
  },
  selectedDateCircle: {
    backgroundColor: '#FF9D5C',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDateText: {
    color: 'white',
    fontWeight: '600',
  },
  highlightedLine: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: '80%',
    backgroundColor: '#FF9D5C',
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 16,
    fontFamily: 'Inter_24pt-SemiBold',
  },
  timeSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeColumn: {
    width: '48%',
  },
  timeLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  timeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  selectedTimeDisplay: {
    fontSize: 16,
  },
  timeDropdownContainer: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    zIndex: 999,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  timeDropdownScroll: {
    maxHeight: 200,
  },
  timeOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  timeSlotContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  selectedTimeOption: {
    backgroundColor: '#f0f8ff',
  },
  timeText: {
    fontSize: 16,
  },
  selectedTimeText: {
    color: '#00A0E0',
    fontWeight: '600',
  },
  freeTag: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  freeTagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  facilityName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    padding: 16,
  },
  summaryContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  totalRow: {
    marginTop: 8,
    borderBottomWidth: 0,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00A0E0',
  },
  continueButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#00A0E0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 25,
    marginBottom: 30,
    zIndex: 1,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default DateTimePage;
