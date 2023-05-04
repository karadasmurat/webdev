const TaskStatus = {
    TODO: 'todo',
    IN_PROGRESS: 'in_progress',
    ON_HOLD: 'on_hold',
    BLOCKED: 'blocked',
    DONE: 'done',
    MISSED: 'missed'
};

function passedDueDate(dueDateStr) {
    // Get the current date
    const today = new Date();

    // Convert the "due_date" string from the JSON to a Date object
    // 2023-05-10
    const dueDate = new Date(dueDateStr);

    // Compare the two dates
    return (dueDate < today);
}

function getRemainingDays(dueDateStr) {
    // Get the current date and the due date as Date objects
    const today = new Date();
    const dueDate = new Date(dueDateStr);

    // Calculate the difference in days between the due date and today
    const timeDiff = dueDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));

}


module.exports = {
    passedDueDate,
    getRemainingDays
};