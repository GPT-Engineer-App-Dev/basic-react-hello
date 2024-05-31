import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Container, FormControl, FormLabel, Input, Select, Table, Tbody, Td, Th, Thead, Tr, VStack, Text } from "@chakra-ui/react";
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent, useVenues } from "../integrations/supabase/index.js";

const Events = () => {
  const { data: events, isLoading, isError } = useEvents();
  const { data: venues } = useVenues();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [newEvent, setNewEvent] = useState({ name: "", date: "", description: "", venue_id: 0, is_pinned: false });
  const [editingEvent, setEditingEvent] = useState(null);
  const [pinnedEvents, setPinnedEvents] = useState([]);

  useEffect(() => {
    if (events) {
      setPinnedEvents(events.filter(event => event.is_pinned));
    }
  }, [events]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = () => {
    addEvent.mutate(newEvent);
    setNewEvent({ name: "", date: "", description: "", venue_id: 0, is_pinned: false });
  };

  const handleUpdateEvent = (event) => {
    updateEvent.mutate(event);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id) => {
    deleteEvent.mutate(id);
  };

  const togglePinEvent = (event) => {
    updateEvent.mutate({ ...event, is_pinned: !event.is_pinned });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading events</div>;

  return (
    <Container maxW="container.lg" mt={4}>
      <VStack spacing={4}>
        <Box w="100%">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={newEvent.name} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input name="date" value={newEvent.date} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input name="description" value={newEvent.description} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Venue</FormLabel>
            <Select name="venue_id" value={newEvent.venue_id} onChange={handleInputChange}>
              {venues.map((venue) => (
                <option key={venue.id} value={venue.id}>
                  {venue.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <Button mt={4} onClick={handleAddEvent}>Add Event</Button>
        </Box>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Date</Th>
              <Th>Description</Th>
              <Th>Venue ID</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {events.map((event) => (
              <Tr key={event.id} style={{ backgroundColor: event.is_pinned ? "#f0f8ff" : "transparent" }}>
                <Td><Link to={`/events/${event.id}`}>{event.name}</Link></Td>
                <Td>{event.date}</Td>
                <Td>{event.description}</Td>
                <Td>{event.venue_id}</Td>
                <Td>
                  <Button size="sm" onClick={() => setEditingEvent(event)}>Edit</Button>
                  <Button size="sm" ml={2} onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                  <Button size="sm" ml={2} onClick={() => togglePinEvent(event)}>{event.is_pinned ? "Unpin" : "Pin"}</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {editingEvent && (
          <Box w="100%">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input name="name" value={editingEvent.name} onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input name="date" value={editingEvent.date} onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input name="description" value={editingEvent.description} onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>Venue</FormLabel>
              <Select name="venue_id" value={editingEvent.venue_id} onChange={(e) => setEditingEvent({ ...editingEvent, venue_id: e.target.value })}>
                {venues.map((venue) => (
                  <option key={venue.id} value={venue.id}>
                    {venue.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Button mt={4} onClick={() => handleUpdateEvent(editingEvent)}>Update Event</Button>
          </Box>
        )}

        <Box w="100%">
          <Text fontSize="xl">Pinned Events</Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Date</Th>
                <Th>Description</Th>
                <Th>Venue ID</Th>
              </Tr>
            </Thead>
            <Tbody>
              {pinnedEvents.map((event) => (
                <Tr key={event.id}>
                  <Td><Link to={`/events/${event.id}`}>{event.name}</Link></Td>
                  <Td>{event.date}</Td>
                  <Td>{event.description}</Td>
                  <Td>{event.venue_id}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Container>
  );
};

export default Events;