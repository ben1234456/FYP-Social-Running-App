import Buddies from '../src/buddies';
import "isomorphic-fetch";

describe("Get buddy", () => {
    it("get first buddy", async function() {
        const response = await Buddies.getFirstBuddy();
        expect(response.id).toEqual(1);
        expect(response.buddyID).toEqual(105);
        expect(response.userID).toEqual(1);
    })

    it("get first buddy request", async function() {
        const response = await Buddies.getFirstBuddyRequest();
        expect(response.id).toEqual(1);
        expect(response.buddyID).toEqual(35);
        expect(response.userID).toEqual(135);
        expect(response.status).toEqual("pending");
    })

});
