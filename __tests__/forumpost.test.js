import ForumPosts from '../src/forumposts';
import "isomorphic-fetch";

describe("Get forum post", () => {
    it("get first forum post", async function() {
        const response = await ForumPosts.getFirstPost();
        expect(response.id).toEqual(1);
        expect(response.user_id).toEqual(1);
        expect(response.title).toEqual("Burn my colories");
        expect(response.description).toEqual("Lets exercise!!");
        expect(response.name).toEqual("Poly");
        expect(response.noLike).toEqual(0);
        expect(response.comments).toEqual(0);
    })

});
