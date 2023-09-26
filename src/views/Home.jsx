import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createProduct, deleteProduct, editProduct, getProducts } from "../api";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const nav = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [products, setProducts] = useState([]);
  const [average, setAverage] = useState(0);
  const [openedId, setOpenedId] = useState(0);
  const [edited, setEdited] = useState({});

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      nav("/auth");
    }

    async function fetchData() {
      const _products = await getProducts();
      setProducts(_products.product);

      let total = 0;
      _products.product.forEach((item) => {
        total += item.price;
      });
      setAverage(total / _products.product.length);
    }

    fetchData();
  }, []);

  return (
    <>
      <Container w={"70%"} minW={"70%"}>
        <br />
        <Heading as="h5" size="2xl" noOfLines={1}>
          <Stack
            spacing={4}
            direction="row"
            align="center"
            justifyContent={"space-between"}
          >
            <Text>Admin Panel</Text>
            <Button
              colorScheme="blue"
              variant="link"
              onClick={() => {
                localStorage.setItem("token", "");
                nav("/auth");
              }}
            >
              Log Out
            </Button>
          </Stack>
        </Heading>
        {products.length > 0 ? (
          <>
            <br />
            <StatGroup>
              <Stat>
                <StatLabel>Products Count</StatLabel>
                <StatNumber>{products.length}</StatNumber>
              </Stat>

              <Stat>
                <StatLabel>Average Price</StatLabel>
                <StatNumber>{average.toFixed(0)} KZT</StatNumber>
              </Stat>
            </StatGroup>
            <br />
            <Heading as="h5" size="xl" noOfLines={1}>
              <Stack
                spacing={4}
                direction="row"
                align="center"
                justifyContent={"space-between"}
              >
                <Text>Products</Text>
                <Button
                  colorScheme="blue"
                  variant="outline"
                  onClick={() => {
                    setOpenedId(null);
                    setEdited({});
                    onOpen();
                  }}
                >
                  Add
                </Button>
              </Stack>
            </Heading>
            <br />
            <Stack spacing={6}>
              {products.map((item) => {
                return (
                  <Card
                    direction={{ base: "column", sm: "row" }}
                    overflow="hidden"
                    variant="outline"
                  >
                    <Image
                      objectFit="cover"
                      maxW={{ base: "100%", sm: "200px" }}
                      src={item.image}
                      alt={item.name}
                    />

                    <Stack>
                      <CardBody>
                        <Heading size="md">{item.name}</Heading>

                        <Text py="2">{item.description}</Text>
                        <Text color="blue.600" fontSize="2xl" fontWeight={600}>
                          {item.price} KZT
                        </Text>
                      </CardBody>

                      <CardFooter>
                        <Stack spacing={4} direction="row" align="center">
                          <Button
                            variant="solid"
                            colorScheme="blue"
                            onClick={() => {
                              setOpenedId(item.id);
                              setEdited(item);
                              onOpen();
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            colorScheme="red"
                            onClick={async () => {
                              toast("Successfully deleted");
                              setProducts(
                                products.filter((it) => it.id != item.id)
                              );
                              await deleteProduct(item.id);
                            }}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="outline"
                            colorScheme="blue"
                            onClick={async () => {
                              toast("Successfully dublicated");
                              await createProduct(item);
                              window.location.reload();
                            }}
                          >
                            Dublicate
                          </Button>
                        </Stack>
                      </CardFooter>
                    </Stack>
                  </Card>
                );
              })}
            </Stack>
            <br />
          </>
        ) : (
          <Center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        )}
      </Container>
      <Toaster />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {openedId != null ? "Edit" : "Create"} product
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Title"
                value={edited.name}
                onChange={(e) => {
                  setEdited({
                    ...edited,
                    name: e.target.value,
                  });
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Description"
                value={edited.description}
                onChange={(e) => {
                  setEdited({
                    ...edited,
                    description: e.target.value,
                  });
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <Input
                  placeholder="Price"
                  type="number"
                  value={edited.price}
                  onChange={(e) => {
                    setEdited({
                      ...edited,
                      price: e.target.value,
                    });
                  }}
                />
                <InputRightAddon children="KZT" />
              </InputGroup>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <Input
                placeholder="Image"
                value={edited.image}
                onChange={(e) => {
                  setEdited({
                    ...edited,
                    image: e.target.value,
                  });
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={async () => {
                if (openedId != null) {
                  toast("Successfully edited!");
                  await editProduct(openedId, edited);
                  onClose();
                  window.location.reload();
                } else {
                  let created = await createProduct(edited);
                  onClose();
                  toast("Successfully created!");
                  setProducts([
                    ...products,
                    {
                      ...edited,
                      id: created.product.insertId,
                    },
                  ]);
                }
              }}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Home;
