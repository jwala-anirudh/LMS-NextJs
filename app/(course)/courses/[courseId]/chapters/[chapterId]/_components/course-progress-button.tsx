'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import axios from 'axios';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle } from 'lucide-react';

import { useConfettiStore } from '@/hooks/use-confetti-store';

import { Button } from '@/components/ui/button';

interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  isCompleted?: boolean;
  nextChapterId?: string;
}

export const CourseProgressButton = ({
  chapterId,
  courseId,
  nextChapterId,
  isCompleted,
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: !isCompleted,
        }
      );

      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      toast.success('Progress updated');

      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = isCompleted ? XCircle : CheckCircle;

  return (
    <Button
      disabled={isLoading}
      onClick={onClick}
      type="button"
      variant={isCompleted ? 'outline' : 'success'}
      className="w-full md:w-auto"
    >
      <Icon className="h-4 w-4 mr-2" />
      {isCompleted ? 'Not as incomplete' : 'Mark as complete'}
    </Button>
  );
};
