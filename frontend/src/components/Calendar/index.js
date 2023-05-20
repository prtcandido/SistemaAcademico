import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import '@fullcalendar/moment';
import 'moment/locale/pt-br';
import moment from 'moment';
import { Grid } from '@mui/material';

import useBuscarPorTodos from "./buscarPorTodos";
import Sidebar from "../Sidebar";

moment.locale('pt-br');


function Calendar() {

  const { data, isLoading, isError } = useBuscarPorTodos();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Ocorreu um erro ao buscar os dados.</div>;
  }

  

  const events = data.map(item => ({
    periodoDe: item.periodoDe,
    periodoAte: item.periodoAte,
    descricao: item.descricao,
    haveraAula: item.haveraAula,
    semestre: {
      descricao: item.semestre.descricao,
      sigla: item.semestre.sigla
    }
  }));
  

  

  const formattedEvents = events.map(event => ({
    title: event.descricao,
    start: moment.utc(event.periodoDe).format('YYYY-MM-DD'),
    end: moment.utc(event.periodoAte).add(1, 'day').format('YYYY-MM-DD'),
    extendedProps: {
      haveraAula: event.haveraAula,
      semestre: event.semestre,
    },
    classNames: ['event-custom', event.haveraAula ? 'event-aula' : 'event-outro'],
  }));

  console.log(data)

  return (
    <Grid container>
      <Grid item xs={2}>
      <Sidebar/>
      </Grid>
      <Grid item xs={10} sx={{ p: 2 }} >
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        footerToolbar={{
          start: "prev",
          center: "today",
          end: "next"
        }}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        buttonText={{
          today: 'Hoje',
          month: 'Mês',
          week: 'Semana',
          day: 'Dia',
        }}
        events={formattedEvents}
        height="90vh"
        locales="pt-br"
      />
      </Grid>
   </Grid>
  );
}

export default Calendar;