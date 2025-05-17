import React, {useState} from 'react';
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
import Back from '../../assets/Booking/Back.svg';
import {useNavigation} from '@react-navigation/native';
import CalendarComponent from '../../component/DateTimePageCompo/CalendarComponent';

const DateTimePage = ({route}) => {
  const navigation = useNavigation();
  const {facility} = route.params;
  const [selectedDate, setSelectedDate] = useState(16);
  const [startTime, setStartTime] = useState('9 AM');
  const [endTime, setEndTime] = useState('11 AM');
  const [showStartTimeDropdown, setShowStartTimeDropdown] = useState(false);
  const [showEndTimeDropdown, setShowEndTimeDropdown] = useState(false);

  const renderCalendarDays = () => {
    const days = [];
    const daysInMonth = 31;
    const currentMonth = 'May 2025';

    // Days of the week
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    // Render days of week header
    const dayHeaders = daysOfWeek.map((day, index) => (
      <View key={`header-${index}`} style={styles.calendarCell}>
        <Text style={styles.dayOfWeekText}>{day}</Text>
      </View>
    ));

    days.push(
      <View key="header-row" style={styles.calendarRow}>
        {dayHeaders}
      </View>,
    );

    // Calendar grid - simplified for this example
    const calendarData = [
      [null, null, null, 1, 2, 3, 4],
      [5, 6, 7, 8, 9, 10, 11],
      [12, 13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24, 25],
      [26, 27, 28, null, null, null, null],
    ];

    calendarData.forEach((week, weekIndex) => {
      const weekRow = week.map((day, dayIndex) => {
        if (day === null) {
          return (
            <View
              key={`empty-${weekIndex}-${dayIndex}`}
              style={styles.calendarCell}
            />
          );
        }

        const isSelected = day === selectedDate;
        const isHighlighted = day === 5; // Day with orange underline

        return (
          <TouchableOpacity
            key={`day-${day}`}
            style={styles.calendarCell}
            onPress={() => setSelectedDate(day)}>
            <View style={[isSelected && styles.selectedDateCircle]}>
              <Text
                style={[
                  styles.calendarDayText,
                  isSelected && styles.selectedDateText,
                ]}>
                {day}
              </Text>
            </View>
            {isHighlighted && <View style={styles.highlightedLine} />}
          </TouchableOpacity>
        );
      });

      days.push(
        <View key={`week-${weekIndex}`} style={styles.calendarRow}>
          {weekRow}
        </View>,
      );
    });

    return (
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity>
            {/* <Ionicons name="chevron-back" size={24} color="#333" /> */}
          </TouchableOpacity>
          <Text style={styles.monthText}>{currentMonth}</Text>
          <TouchableOpacity>
            {/* <Ionicons name="chevron-forward" size={24} color="#333" /> */}
          </TouchableOpacity>
        </View>
        <View style={styles.calendarGrid}>{days}</View>
      </View>
    );
  };

  const renderTimeDropdown = type => {
    const times = ['9 AM', '10 AM', '11 AM', '12 AM'];
    const isStart = type === 'start';
    const selectedTime = isStart ? startTime : endTime;

    return (
      <View style={styles.timeDropdownContainer}>
        {times.map(time => (
          <TouchableOpacity
            key={time}
            style={styles.timeOption}
            onPress={() => {
              if (isStart) {
                setStartTime(time);
                setShowStartTimeDropdown(false);
              } else {
                setEndTime(time);
                setShowEndTimeDropdown(false);
              }
            }}>
            <Text
              style={[
                styles.timeText,
                time === selectedTime && styles.selectedTimeText,
              ]}>
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

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
        <View style={{flex: 1}}>
          <ScrollView style={styles.content}>
            <View style={styles.courtInfoCard}>
              <Image source={facility.image} style={styles.courtImage} />
            </View>
            <View style={styles.card}>
              <View
                style={[
                  styles.statusTag,
                  // {backgroundColor: item.available ? '#029DDD1A' : '#F15B5B1A'},
                  {backgroundColor: '#029DDD1A'},
                ]}>
                <Text
                  style={[
                    styles.statusText,
                    // {color: item.available ? '#029DDD' : '#F15B5B'},
                    {color: '#029DDD'},
                  ]}>
                  {/* {item.available ? 'Available' : 'Not Available'} */}
                  Available
                </Text>
              </View>
              <Text style={styles.title}>{facility.name}</Text>
            </View>

            {/* {renderCalendarDays()} */}
            {/* =============================================================================================== */}
            <CalendarComponent />
            {/* =============================================================================================== */}
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
                  {/* <Ionicons name="chevron-down" size={20} color="#333" /> */}
                </TouchableOpacity>
                {showStartTimeDropdown && renderTimeDropdown('start')}
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
                  {/* <Ionicons name="chevron-down" size={20} color="#333" /> */}
                </TouchableOpacity>
                {showEndTimeDropdown && renderTimeDropdown('end')}
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue</Text>
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
  content: {
    flexGrow: 1,
    backgroundColor: 'white',
    marginTop: 45,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 25,
    paddingHorizontal: 25,
  },
  courtInfoCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: '#ccc',
    // padding: 16,
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
    fontSize: 16,
    fontFamily: 'Satoshi-Medium',
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
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timeOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  timeText: {
    fontSize: 16,
  },
  selectedTimeText: {
    color: '#00A0E0',
    fontWeight: '600',
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
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Satoshi-Bold',
    marginTop: 7,
    marginBottom: 17,
  },
  card: {
    marginBottom: 5,
  },
  statusTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    marginTop: 12,
    borderRadius: 100,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Satoshi-Medium',
  },
});

export default DateTimePage;
