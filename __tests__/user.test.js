import Users from '../src/users';
import "isomorphic-fetch";

describe("Get user", () => {
  it("get first user", async function() {
    const response = await Users.getFirstUser();
    expect(response.id).toEqual(1);
    expect(response.email).toEqual("123@gmail.com");
    expect(response.gender).toEqual("male");
    expect(response.city).toEqual("Pahang");
    expect(response.dob).toEqual("2021-10-19");
    expect(response.role).toEqual("user");
  })

});

describe("User search list", () => {
  it("get user list", async function() {
    const response = await Users.getUserList();
    expect(Object.keys(response).length).toEqual(10);
  }) 

  it("user list does not contain the searcher", async function() {
    const response = await Users.getUserList();
    for(var user of response){
      expect(user.id).not.toEqual(1);
    }
  }) 

});