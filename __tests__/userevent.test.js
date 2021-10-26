import UserEvents from '../src/userevents';
import "isomorphic-fetch";

describe("Get user event", () => {
    it("get first user event", async function() {
        const response = await UserEvents.getFirstUserEvent();
        expect(response.id).toEqual(1);
        expect(response.user_id).toEqual(1);
        expect(response.event_id).toEqual(1);
        expect(response.registration_dt).toEqual("2021-10-26 03:19:41");
        expect(response.distance).toEqual("10.00");
        expect(response.status).toEqual("in-progress");
    })

});
