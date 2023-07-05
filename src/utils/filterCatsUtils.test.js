import { removeBreedlessCats, removeDuplicates, sanitizeSearchText, searchCatBreeds} from "./filterCatsUtils";
import { CAT_API_RESPONSE, CAT_API_RESPONSE_NO_BREED_INFO } from "../fixtures";

describe("removeBreedlessCats", () => {
    it('should remove cats without breed information', () => {
        expect(removeBreedlessCats(CAT_API_RESPONSE).length).toBe(2);
        expect(removeBreedlessCats(CAT_API_RESPONSE_NO_BREED_INFO).length).toBe(0);
    });
});

describe("removeDuplicates", () => {
   it('should remove duplicate cats', () => {
       const testArray = [...CAT_API_RESPONSE, CAT_API_RESPONSE[0]];
       expect(removeDuplicates(testArray).length).toBe(CAT_API_RESPONSE.length);
   });
   it('should not remove unique cats', () => {
       expect(removeDuplicates(CAT_API_RESPONSE).length).toBe(CAT_API_RESPONSE.length);
   });
});

describe("filterCats", () => {
    it('should remove breedless cats', () => {
        expect(removeBreedlessCats(CAT_API_RESPONSE).length).toBe(2);
        expect(removeBreedlessCats(CAT_API_RESPONSE_NO_BREED_INFO).length).toBe(0);
    });
    it('should remove duplicate cats', () => {
        const testArray = [...CAT_API_RESPONSE, CAT_API_RESPONSE[0]];
        expect(removeDuplicates(testArray).length).toBe(CAT_API_RESPONSE.length);
    });
    it('should not remove unique cats', () => {
        expect(removeDuplicates(CAT_API_RESPONSE).length).toBe(CAT_API_RESPONSE.length);
    });
});

describe("sanitizeSearchText", () => {
  it('should remove leading and trailing whitespace', () => {
      expect(sanitizeSearchText("   test   ")).toBe("test");
  });
  it('should lowercase all characters', () => {
      expect(sanitizeSearchText("TEST")).toBe("test");
  });
});

describe("searchCatBreeds", () => {
  it('should return all cats if searchText is empty', () => {
      expect(searchCatBreeds(CAT_API_RESPONSE, "")).toEqual(CAT_API_RESPONSE);
  });
  it('should return all cats if searchText is whitespace', () => {
    expect(searchCatBreeds(CAT_API_RESPONSE, "   ")).toEqual(CAT_API_RESPONSE);
  });
  it("should return only cats with breed names that include the searchText", () => {
    const searchStr = CAT_API_RESPONSE[0].breeds[0].name;
    expect(searchCatBreeds(CAT_API_RESPONSE, searchStr).length).toBe(1);
  });
  it("should return an empty array when the array has no breed information", () => {
    const searchStr = CAT_API_RESPONSE[0].breeds[0].name;
    expect(searchCatBreeds(CAT_API_RESPONSE_NO_BREED_INFO, searchStr).length).toBe(0);
  });
});