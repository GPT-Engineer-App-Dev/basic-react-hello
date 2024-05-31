import { useParams } from "react-router-dom";
import { Box, Button, Container, FormControl, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { useEvent, useComments, useAddComment } from "../integrations/supabase/index.js";
import { useState } from "react";

const EventDetails = () => {
  const { id } = useParams();
  const { data: event, isLoading: eventLoading, isError: eventError } = useEvent(id);
  const { data: comments, isLoading: commentsLoading, isError: commentsError } = useComments(id);
  const addComment = useAddComment();

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    addComment.mutate({ content: newComment, event_id: id });
    setNewComment("");
  };

  if (eventLoading || commentsLoading) return <div>Loading...</div>;
  if (eventError || commentsError) return <div>Error loading event details</div>;

  return (
    <Container maxW="container.lg" mt={4}>
      <VStack spacing={4}>
        <Box w="100%">
          <Text fontSize="2xl">{event.name}</Text>
          <Text>{event.date}</Text>
          <Text>{event.description}</Text>
        </Box>

        <Box w="100%">
          <FormControl>
            <FormLabel>Add a Comment</FormLabel>
            <Input value={newComment} onChange={(e) => setNewComment(e.target.value)} />
            <Button mt={2} onClick={handleAddComment}>Add Comment</Button>
          </FormControl>
        </Box>

        <Box w="100%">
          <Text fontSize="xl">Comments</Text>
          {comments.map((comment) => (
            <Box key={comment.id} p={2} borderWidth="1px" borderRadius="md">
              <Text>{comment.content}</Text>
            </Box>
          ))}
        </Box>
      </VStack>
    </Container>
  );
};

export default EventDetails;