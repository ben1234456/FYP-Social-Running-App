import Activities from '../src/activities';
import "isomorphic-fetch";

describe("Get user activity", () => {
    it("get first user activity", async function() {
        const response = await Activities.getFirstActivity();
        expect(response.id).toEqual(1);
        expect(response.activity_type).toEqual("cycling");
        expect(response.route_id).toEqual(1);
        expect(response.start_lat).toEqual("4.41126940");
        expect(response.start_lng).toEqual("114.00390130");
        expect(response.end_lat).toEqual("0.00000000");
        expect(response.end_lng).toEqual("0.00000000");
        expect(response.highest_altitude).toEqual("0.00");
        expect(response.total_distance).toEqual("0.00");
        expect(response.total_duration).toEqual("00:00:05");
    })

});
