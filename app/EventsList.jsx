import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

class EventsList extends React.Component {

  render() {
    return (<Accordion>
      <AccordionItem>
        <AccordionItemTitle>
          <h3>Simple title</h3>
        </AccordionItemTitle>
        <AccordionItemBody>
          <p>Body content</p>
        </AccordionItemBody>
      </AccordionItem>
    </Accordion>)
  }

};

export default EventsList;
