import { Container, Table, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { useVenues } from "../integrations/supabase/index.js";

const Venues = () => {
  const { data: venues, isLoading, isError } = useVenues();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading venues</div>;

  return (
    <Container maxW="container.lg" mt={4}>
      <VStack spacing={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Location</Th>
              <Th>Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            {venues.map((venue) => (
              <Tr key={venue.id}>
                <Td>{venue.name}</Td>
                <Td>{venue.location}</Td>
                <Td>{venue.description}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Venues;