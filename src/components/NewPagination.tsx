import { Flex, Button } from '@chakra-ui/react';
import { TbSquareArrowLeft, TbSquareArrowRight } from 'react-icons/tb';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export default function NewPagination({ currentPage, totalPages, setCurrentPage }: PaginationProps) {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalToShow = 5;
    const start = Math.max(1, currentPage - Math.floor(totalToShow / 2));
    const end = Math.min(totalPages, start + totalToShow - 1);

    for (let i = start; i <= end; i++) {
      pageNumbers.push(
        <Button
          key={i}
          onClick={() => setCurrentPage(i)}
          variant={i === currentPage ? 'solid' : 'outline'}
          colorScheme={i === currentPage ? 'blue' : 'gray'}
          mx={1}
        >
          {i}
        </Button>
      );
    }

    if (totalPages > end) {
      pageNumbers.push(
        <Button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          variant="outline"
          colorScheme="gray"
          mx={1}
        >
          {totalPages}
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <Flex justify="center" my={5} align="center" wrap="wrap">
      <Button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        isDisabled={currentPage === 1}
        mx={1}
        leftIcon={<TbSquareArrowLeft />}
      >
        Anterior
      </Button>
      {renderPageNumbers()}
      <Button
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        isDisabled={currentPage === totalPages}
        mx={1}
        rightIcon={<TbSquareArrowRight />}
      >
        Próxima
      </Button>
    </Flex>
  );
}