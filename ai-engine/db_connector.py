import os
from neo4j import GraphDatabase
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Neo4jConnection:
    def __init__(self):
        # Get credentials from environment variables
        uri = os.getenv("NEO4J_URI", "bolt://localhost:7687")
        user = os.getenv("NEO4J_USER", "neo4j")
        password = os.getenv("NEO4J_PASSWORD", "password123")
        
        try:
            self.driver = GraphDatabase.driver(uri, auth=(user, password))
            print("✅ Connected to Neo4j successfully.")
        except Exception as e:
            print(f"❌ Failed to connect to Neo4j: {e}")
            self.driver = None

    def close(self):
        if self.driver:
            self.driver.close()

    def execute_query(self, query, parameters=None):
        """Executes a Cypher query and returns results."""
        if not self.driver:
            return None
        
        with self.driver.session() as session:
            result = session.run(query, parameters)
            return [record for record in result]

# Create a singleton instance to be used elsewhere
db = Neo4jConnection()