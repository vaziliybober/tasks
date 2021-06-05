import React from 'react';
import styled from '@emotion/styled';

import DOMPurify from 'dompurify';

import { formatId } from '../../../shared';

import FormHeader from './FormHeader';
import FormField from './FormField';
import Comments from './Comments';
import UnstyledCommentAdder from './CommentAdder';

import useTaskQuery from '../../../hooks/useTaskQuery';

export default function EditTaskForm({ taskId, onClose = () => {} }) {
  const { data: task, status } = useTaskQuery(taskId);

  if (status === 'loading') {
    return 'Loading task...';
  }

  if (status === 'error') {
    return "Couldn't load the task";
  }

  const comments = task.lifetimeItems.filter((item) => item.comment);

  return (
    <Container>
      <FormHeader
        title={`№ ${formatId(task.id)}`}
        description={task.name}
        onClose={onClose}
      />
      <FormBody>
        <MainBlock>
          <DescriptionField title="Описание">
            <TextBlock
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(task.description),
              }}
            />
          </DescriptionField>
          <CommentAdder task={task} />
          <Comments comments={comments} />
        </MainBlock>
        <Sidebar>sidebar</Sidebar>
      </FormBody>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  min-width: 740px;
`;

const FormBody = styled.div`
  display: flex;
  min-height: calc(100% - 60px);
`;

const MainBlock = styled.div`
  //background: lightskyblue;
  padding: 28px 30px 20px 40px;
  min-width: 500px;
  max-width: calc(100% - 240px);
  width: 45vw;
`;

const Sidebar = styled.div`
  width: 240px;
  flex-shrink: 0;

  //background: lightseagreen;
  padding: 28px;
  border-left: 1px solid #d7dce0;
`;

const TextBlock = styled.div`
  color: #060606;
  font-size: 14px;
`;

const DescriptionField = styled(FormField)`
  margin-bottom: 50px;

  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
`;

const CommentAdder = styled(UnstyledCommentAdder)`
  margin-bottom: 45px;
`;
