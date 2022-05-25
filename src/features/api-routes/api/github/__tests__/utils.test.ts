import * as githubUtils from "../utils";

describe("github", () => {
  describe("#getMetadataAndClean()", () => {
    const metadata = {
      bounties: [
        {
          chain: "near",
          bountyId: 1,
        },
      ],
    };

    it("should return parsed description metadata", () => {
      const description = `This is a description \n\n<!-- better-meta = ${JSON.stringify(
        metadata
      )} -->`;

      const { metadata: descriptionMetadata } =
        githubUtils.getMetadataAndCleanedComment(description);
      expect(descriptionMetadata).toMatchObject(metadata);
    });

    it("should return empty parsed description metadata", () => {
      const description = `This is a description`;

      const { metadata: descriptionMetadata } =
        githubUtils.getMetadataAndCleanedComment(description);
      expect(descriptionMetadata).toMatchObject({
        bounties: [],
      });
    });
  });
});
