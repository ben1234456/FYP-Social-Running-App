import CalendarEvents from '../src/calendarevents';
import "isomorphic-fetch";

describe("Get calendar events", () => {
    it("get first calendar event", async function() {
        const response = await CalendarEvents.getFirstCalendarEvent();
        expect(response.id).toEqual(1);
        expect(response.userID).toEqual(105);
        expect(response.time).toEqual(306);
        expect(response.title).toEqual("name");
        expect(response.date).toEqual("2021-10-23");
    })

});
