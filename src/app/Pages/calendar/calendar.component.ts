import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarOptions, EventApi, EventInput, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import { CalendarInterface } from '../../../models/calendar';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { CalendarService } from '../../services/calendar.service';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, RouterOutlet],
  templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnInit{

  eventGuid:number = 0;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    displayEventTime: false,
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin
    ]
  };
  currentEvents: EventApi[] = [];

  constructor(private changeDetector: ChangeDetectorRef, private CalendarService: CalendarService) { }

  ngOnInit() {
    this.CalendarService.getListDates().subscribe((data: CalendarInterface[]) => {
      console.log(data);
      const events: EventInput[] = data.map(event => ({
        id: String(event._id), // Convert the id to a string
        title: event.title,
        start: new Date(event.date),
        end: new Date(event.date),
      }));

      this.calendarOptions.events = events;
      this.calendarOptions.headerToolbar = {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      };
      this.calendarOptions.weekends = true;
      this.calendarOptions.editable = true;
      this.calendarOptions.selectable = true;
      this.calendarOptions.selectMirror = true;
      this.calendarOptions.dayMaxEvents = true;
      this.calendarOptions.select = this.handleDateSelect.bind(this);
      this.calendarOptions.eventClick = this.handleEventClick.bind(this);
      this.calendarOptions.eventsSet = this.handleEvents.bind(this);
    });
  }

  refreshEvents() {
    this.CalendarService.getListDates().subscribe((data: CalendarInterface[]) => {
      const events: EventInput[] = data.map(event => ({
        id: String(event._id),
        title: event.title,
        start: new Date(event.date),
        end: new Date(event.date),
      }));

      this.calendarOptions.events = events;
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Introdueix el nom del event:');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      const newEvent: CalendarInterface = {

        title,
        date: new Date(selectInfo.startStr).toISOString(),
      };

      calendarApi.addEvent({
        title: newEvent.title,
        start: new Date(newEvent.date),
        end: new Date(newEvent.date),
      });

      this.CalendarService.saveDate(newEvent).subscribe((response: any) => {
        console.log(`L'event s'ha enregistat correctament`, response);
        this.refreshEvents();
      }, (error: any) => {
        console.error(`Ha ocorregut un error al guardar l'event:`, error);
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Segur que desitges eliminar l'event:' ${clickInfo.event.title}'`)) {
      console.log(clickInfo.event.id);

      this.CalendarService.deleteDate(clickInfo.event.id).subscribe((response: any) => {
        console.log('Event eliminat amb éxit:', response);
        clickInfo.event.remove();
      }, (error:any) => {
          console.error(`Ha ocorregut un error al eliminar l'event:`, error);
      });
    }
  }


  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
}
