import Events from '../src/events';
import "isomorphic-fetch";

describe("Get event", () => {
    it("get first event", async function() {
        const response = await Events.getFirstEvent();
        expect(response.id).toEqual(1);
        expect(response.event_name).toEqual("Virtual Run 1");
        expect(response.start).toEqual("2021-10-22");
        expect(response.end).toEqual("2021-10-27");
        expect(response.registration_start).toEqual("2021-10-14");
        expect(response.registration_end).toEqual("2021-10-16");
        expect(response.description).toEqual("Run Run Run!");
    })

});

describe("Exclusive events", () => {
    it("does not contain registered event for user 1", async function() {
        const response = await Events.getExclusiveEvent();
        for(var event of response){
            expect(event.id).not.toEqual(1);
          }
    })
  
});