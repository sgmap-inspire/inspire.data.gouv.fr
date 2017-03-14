import React from 'react'

import DocumentTitle from 'react-document-title'

import EventbriteWidget from '../../../../components/Event/EventbriteWidget'

import { events, eventsList } from './Events.css'

const Events = () => {
  return (
    <DocumentTitle title={'Événements'}>
      <div className={events}>
        <h1>Événements à venir</h1>
        <div className={eventsList}>
          <EventbriteWidget src="https://www.eventbrite.fr/countdown-widget?eid=32256259340"/>
          <EventbriteWidget src="https://www.eventbrite.fr/countdown-widget?eid=32842679338"/>
        </div>
        <h1>Évènements passé</h1>
      </div>
    </DocumentTitle>
  )
}

export default Events
