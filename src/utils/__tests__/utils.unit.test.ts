import { transformToAttributesWithValues } from "../utils";

describe("`transformToAttributesWithValues` fn tests", () => {
  it("should return correct result", () => {
    const filtersMap = {
      1: ["25, 74"],
      2: ["45", "67"]
    };

    const expectedValue = [
      {
        id: 1,
        type: "attributes",
        values: filtersMap[1]
      },
      {
        id: 2,
        type: "attributes",
        values: filtersMap[2]
      }
    ];

    expect(transformToAttributesWithValues(filtersMap)).toEqual(expectedValue);
  });
});
