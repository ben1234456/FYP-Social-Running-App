import Routes from '../src/maproutes';
import "isomorphic-fetch";

describe("Get routes", () => {
    it("get first route", async function() {
        const response = await Routes.getFirstRoute();
        expect(response.id).toEqual(1);
        expect(response.userID).toEqual(115);
        expect(response.name).toEqual("name");
        expect(response.start_lat).toEqual("2.11765403");
        expect(response.start_lng).toEqual("112.94022426");
        expect(response.end_lat).toEqual("1.51681316");
        expect(response.end_lng).toEqual("110.35086997");
        expect(response.check1_lat).toEqual("1.48757001");
        expect(response.check1_lng).toEqual("112.99275753");
        expect(response.check2_lat).toEqual("2.12166426");
        expect(response.check2_lng).toEqual("112.95695924");
        expect(response.total_distance).toEqual("5.56");
    })

});
