let eventHolder = [];

const addEventHandlers = events => {
  for (const event of events) {
    if (eventHolder.some(({ type, selector }) => event.type === type && event.selector === selector)) return;

    window.addEventListener(event.type, event.handler);
    eventHolder = [...eventHolder, event];
  }
};

export default addEventHandlers;
