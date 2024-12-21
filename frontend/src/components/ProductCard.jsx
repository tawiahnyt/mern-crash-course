/** @format */

// import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  PopoverArrow,
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useProductStore } from "../store/product";
import { toaster } from "../components/ui/toaster";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct } = useProductStore();
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toaster.error({
        title: "An error occurred",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toaster.success({
        title: "Product deleted",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={"auto"}
        w={"full"}
        objectFit={"cover"}
      />

      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack gap={2}>
          <IconButton onClick={setOpen} colorPalette={"blue"}>
            {<FaEdit />}
          </IconButton>
          <IconButton
            onClick={() => handleDeleteProduct(product._id)}
            colorPalette={"red"}
          >
            <AiFillDelete />
          </IconButton>
        </HStack>
      </Box>

      <PopoverRoot
        positioning={"z-index: 1000"}
        autoFocus
        modal={true}
        size={"lg"}
        placement={"center"}
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Stack gap="4">
              <Input placeholder="40px" />
              <Input placeholder="32px" />
              <Input placeholder="Start typing..." />
            </Stack>
          </PopoverBody>
          <PopoverCloseTrigger />
        </PopoverContent>
      </PopoverRoot>
    </Box>
  );
};

export default ProductCard;
