import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {Meeting} from './meeting';
@Pipe({
    name: 'meetingFilter'
  })
  @Injectable()
  export class MeetingFilter implements PipeTransform {
    transform(meeting: Meeting[], args: any[]): any {
      return meeting.filter(meeting => meeting.date == args[0]);
    }
  }