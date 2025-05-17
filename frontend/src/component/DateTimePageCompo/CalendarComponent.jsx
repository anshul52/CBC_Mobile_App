import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';

const CalendarComponent = () => {
  const markedDates = {
    '2025-05-16': {
      selected: true,
      selectedColor: '#FFA14A',
    },
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={'2025-05-01'}
        markedDates={markedDates}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6b6b6',
          selectedDayBackgroundColor: '#FFA14A',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#000000',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          monthTextColor: '#000000',
          textMonthFontSize: 16,
          textDayFontSize: 14,
          textDayHeaderFontSize: 14,
          'stylesheet.calendar.header': {
            header: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 10,
              paddingRight: 10,
              marginTop: 6,
              alignItems: 'center',
            },
            monthText: {
              fontSize: 16,
              fontWeight: '500',
              color: '#000000',
            },
          },
          'stylesheet.day.basic': {
            base: {
              width: 32,
              height: 32,
              alignItems: 'center',
              justifyContent: 'center',
            },
            text: {
              fontSize: 14,
              fontWeight: '400',
            },
          },
          'stylesheet.calendar.main': {
            week: {
              marginTop: 4,
              marginBottom: 4,
              flexDirection: 'row',
              justifyContent: 'space-around',
            },
          },
        }}
        renderArrow={direction => (
          <Text style={styles.arrow}>{direction === 'left' ? '‹' : '›'}</Text>
        )}
        renderHeader={date => {
          const month = date.toString('MMMM yyyy');
          return <Text style={styles.monthText}>May 2025</Text>;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 0,
  },
  arrow: {
    fontSize: 24,
    color: '#000000',
    padding: 10,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
});

export default CalendarComponent;
