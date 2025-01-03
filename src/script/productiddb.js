const updateMouseCollection = async () => {
  const bucketId = "67763e26001fab38abd4"; // Your bucket ID
  const databaseId = "675bcd71002a456f4295"; // Your database ID
  const mouseCollectionId = "676e7d93002f49c298bd"; // Your mouse collection ID

  try {
    // Fetch all files from the bucket
    const files = await storage.listFiles(bucketId);
    console.log("All file names in bucket:", files.files.map(file => file.name));

    // Filter files starting with 'z' followed by numbers (e.g., z30.jpg, z29.jpg, ...)
    const mouseImages = files.files.filter(file => /^z\d+/.test(file.name));
    console.log("Filtered mouse images:", mouseImages);

    // If no images are found, exit early
    if (mouseImages.length === 0) {
      console.log("No images found that match the pattern.");
      return;
    }

    // Loop through productIds from 4000 to 4029
    for (let i = 4000; i <= 4029; i++) {
      const productId = i.toString();

      // Query the documents by productId field
      const documents = await databases.listDocuments(
        databaseId,
        mouseCollectionId,
        [Query.equal("productId", productId)]
      );

      if (documents.documents.length > 0) {
        const document = documents.documents[0]; // Assuming one document per productId
        const file = mouseImages[i - 4000]; // Corresponds to z30, z29, etc.
        const imageUrl = `${"https://cloud.appwrite.io/v1"}/storage/buckets/${bucketId}/files/${file.$id}/view?project=${"6746052c001ebc1e13ec"}`;

        const updatedDocument = await databases.updateDocument(
          databaseId,
          mouseCollectionId,
          document.$id, // Use the document's actual ID
          { imgUrl: imageUrl }
        );

        console.log(`Updated productId ${productId} with URL:`, updatedDocument);
      } else {
        console.log(`No document found for productId ${productId}`);
      }
    }
  } catch (error) {
    console.error("Error updating mouse collection:", error.message);
  }
};

// Call the function
updateMouseCollection();
