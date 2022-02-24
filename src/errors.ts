import * as status from "http-status";

// Defines an https://datatracker.ietf.org/doc/html/rfc7807 conform HTTP responses
// This file implements the necessary methods we use in this project;
//     instead of using libraries like: https://www.npmjs.com/package/http-problem-details
export interface ProblemDocument {
  // A URI reference that identifies the problem type.
  type: string;
  // A short, human-readable summary of the problem type
  title: string;
  // A URI reference that identifies the specific occurrence of the problem
  instance?: string;
  detail?: string;
  status: number;
}

interface _ResponseMethodParams {
  title?: string;
  detail?: string;
  instance?: string;
}

export const getBadRequestResponse = ({
  detail,
  instance,
  title,
}: _ResponseMethodParams = {}): ProblemDocument => {
  const { BAD_REQUEST } = status;

  return {
    status: BAD_REQUEST,
    type: status[`${BAD_REQUEST}_NAME`] as string,
    title: title || (status[`${BAD_REQUEST}_MESSAGE`] as string),
    detail,
    instance,
  };
};

export const getNotFoundResponse = ({
  detail,
  instance,
  title,
}: _ResponseMethodParams = {}): ProblemDocument => {
  const { NOT_FOUND } = status;

  return {
    status: NOT_FOUND,
    type: status[`${NOT_FOUND}_NAME`] as string,
    title: title || (status[`${NOT_FOUND}_MESSAGE`] as string),
    detail,
    instance,
  };
};
