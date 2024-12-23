import { Client, Databases, ID } from "node-appwrite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ES Module-specific handling for __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Appwrite Client
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Appwrite endpoint
  .setProject("6746052c001ebc1e13ec") // Your project ID
  .setKey("standard_5cea37ca3b59bf363c186eb5b8beca2977979e6cbf30efd9f8a92da460bd7f54c2710784aac5593e9e8da773824edd748b764d1706476c04ed93a7f6ee10cd4fb6dbcc1818eda8740180906dc85c5f1051f15be5f6167a565da31ea4784c43f27ab1ee8f9cebe6223141e68aad0a48857b6b2dac6b5648e6e3b35a3fabadfcc7"); // API key from environment variable

const databases = new Databases(client);

// IDs for database and collection
const databaseId = "675bcd71002a456f4295"; // Replace with your database ID
const collectionId = "675bd372002cc4d01082"; // Replace with your collection ID

// Path to JSON file
const jsonFilePath = path.join(__dirname, "../assets/Database/mouse.json");
const products = JSON.parse(fs.readFileSync(jsonFilePath, "utf8")); // Parse JSON file

// Async function to upload data
(async () => {
  for (const product of products) {
    try {
      const response = await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(), // Generate a unique ID for each document
        product
      );
      console.log(`Uploaded: ${response.name}`);
    } catch (error) {
      console.error(`Failed to upload ${product.name}:`, error.message);
    }
  }
})();
