/* eslint-disable prettier/prettier */
export const addCounter = (counter) => ({
    type: 'ADD_COUNTER',
    payload: counter,
});

export const removeCounter = (id) => ({
    type: 'REMOVE_COUNTER',
    payload: id,
});

export const incrementCounter = (id) => ({
    type: 'INCREMENT_COUNTER',
    payload: id,
});

export const decrementCounter = (id) => ({
    type: 'DECREMENT_COUNTER',
    payload: id,
});

export const resetCounter = (id) => ({
    type: 'RESET_COUNTER',
    payload: id,
});

export const updateCounterName = (id, name) => ({
    type: 'UPDATE_COUNTER_NAME',
    payload: { id, name },
});
