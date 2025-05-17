// import React from 'react';
// import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import BackBlack from '../../assets/Booking/BackBlack.svg';
// import ForwardBlack from '../../assets/Booking/ForwardBlack';

// const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
// const dates = [
//   ['', '', '', '1', '2', '3', '4'],
//   ['5', '6', '7', '8', '9', '10', '11'],
//   ['12', '13', '14', '15', '16', '17', '18'],
//   ['19', '20', '21', '22', '23', '24', '25'],
//   ['26', '27', '28', '', '', '', ''],
// ];

// const Calendar = () => {
//   const selectedDate = '16';
//   const markedDate = '4';

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <BackBlack width={13} height={13} />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>May 2025</Text>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <ForwardBlack width={13} height={13} />
//         </TouchableOpacity>
//       </View>

//       {/* Days of Week */}
//       <View
//         style={[
//           styles.weekRow,
//           {backgroundColor: '#EDEDED', paddingVertical: 10, marginTop: 5},
//         ]}>
//         {daysOfWeek.map((day, idx) => (
//           <Text key={idx} style={styles.weekText}>
//             {day}
//           </Text>
//         ))}
//       </View>

//       {/* Date Grid */}
//       {dates.map((week, i) => (
//         <View key={i} style={styles.weekRow}>
//           {week.map((date, j) => {
//             const isSelected = date === selectedDate;
//             const isMarked = date === markedDate;
//             const isDim = date === '';

//             return (
//               <View key={j} style={[styles.dateCell]}>
//                 {isMarked && <View style={styles.underline} />}
//                 <Text
//                   style={[
//                     styles.dateText,
//                     isSelected && styles.selectedDateText,
//                     isDim && styles.dimDateText,
//                   ]}>
//                   {date}
//                 </Text>
//                 {isSelected && <View style={styles.circle} />}
//               </View>
//             );
//           })}
//         </View>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding: 16,
//     backgroundColor: '#fff',
//     width: '100%',
//     alignSelf: 'center',
//     marginTop: 5,
//     marginBottom: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   headerText: {
//     fontSize: 18,
//     fontFamily: 'Inter_24pt-Medium',
//   },
//   arrow: {
//     fontSize: 20,
//     paddingHorizontal: 10,
//   },
//   weekRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 8,
//     // backgroundColor: '#EDEDED',
//   },
//   weekText: {
//     color: '#888',
//     fontWeight: '600',
//     width: 30,
//     textAlign: 'center',
//   },
//   dateCell: {
//     width: 30,
//     height: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'relative',
//   },
//   dateText: {
//     fontSize: 14,
//     color: '#000',
//     fontFamily: 'Inter_24pt-SemiBold',
//   },
//   dimDateText: {
//     color: '#bbb',
//   },
//   selectedDateText: {
//     color: '#fff',
//     zIndex: 2,
//   },
//   circle: {
//     position: 'absolute',
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     backgroundColor: '#FFA14A',
//     top: 0,
//     zIndex: 1,
//   },
//   underline: {
//     position: 'absolute',
//     width: 20,
//     height: 2,
//     backgroundColor: '#FFA14A',
//     top: 25,
//   },
// });

// export default Calendar;

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';

const CalendarComponent = () => {
  const markedDates = {
    '2025-05-04': {
      marked: true,
      dotColor: 'transparent',
      customStyles: {
        container: {
          borderBottomWidth: 2,
          borderBottomColor: '#FFA14A',
        },
        text: {},
      },
    },
    '2025-05-16': {
      selected: true,
      selectedColor: '#FFA14A',
      selectedTextColor: '#fff',
    },
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={'2025-05-01'}
        markingType={'custom'}
        markedDates={markedDates}
        theme={{
          textDayFontSize: 16,
          textDayFontWeight: '500',
          textMonthFontSize: 18,
          textMonthFontWeight: 'bold',
          textSectionTitleColor: '#888',
          monthTextColor: '#000',
          arrowColor: '#000',
          selectedDayBackgroundColor: '#FFA14A',
          selectedDayTextColor: '#fff',
        }}
        renderArrow={direction => (
          <View>
            <Text style={{fontSize: 18}}>
              {direction === 'left' ? '<' : '>'}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 8,
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
  },
});

export default CalendarComponent;
