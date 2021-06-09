import React from "react";
import axios from "axios";

import { 
  render, 
  cleanup, 
  waitForElement, 
  fireEvent, 
  getByText, 
  getAllByTestId, 
  getByAltText, 
  getByPlaceholderText,
  queryByText, 
  prettyDOM
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe('Application', () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const {getByText} = render(<Application />);
    return waitForElement(() => getByText('Monday'))
      .then(() => {
        fireEvent.click(getByText('Tuesday'));
        expect(getByText('Leopold Silvers')).toBeInTheDocument();
      });
  });
  
  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    const {container, debug} = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(container, 'appointment')[0];
    fireEvent.click(getByAltText(appointment, 'Add'));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {target: {value: 'Lydia Miller-Jones'}});
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    fireEvent.click(getByText(appointment, 'Save'));
    expect(getByText(appointment, 'SAVING')).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));
    const day = getAllByTestId(container, 'day').find(day => 
      queryByText(day, 'Monday')
    );
    expect(getByText(day, 'no spots remaining')).toBeInTheDocument();
  });

  it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    const {container} = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(container, 'appointment').find(appointment => 
      queryByText(appointment, 'Archie Cohen')
    );
    fireEvent.click(getByAltText(appointment, 'Delete'));
    expect(getByText(appointment, 'Are you sure you would like to delete?')).toBeInTheDocument();
    fireEvent.click(queryByText(appointment, 'Confirm'));
    expect(getByText(appointment, 'DELETING')).toBeInTheDocument();
    await waitForElement(() => getByAltText(appointment, 'Add'));
    const day = getAllByTestId(container, 'day').find(day =>
      queryByText(day, 'Monday')
    );
    expect(getByText(day, '2 spots remaining')).toBeInTheDocument();
  });

  it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
    const {container} = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(container, 'appointment').find(appointment => 
      queryByText(appointment, 'Archie Cohen')
    );
    fireEvent.click(getByAltText(appointment, 'Edit'));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {
        value: "Arch Cohen"
      }
    });
    fireEvent.click(getByText(appointment, 'Save'));
    expect(getByText(appointment, 'SAVING')).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, 'Arch Cohen'));
    const day = getAllByTestId(container, 'day').find(day =>
      queryByText(day, 'Monday')
    );
    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const {container} = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(container, 'appointment').find(appointment => 
      queryByText(appointment, 'Archie Cohen')
    );
    fireEvent.click(getByAltText(appointment, 'Edit'));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {
        value: "Arch Cohen"
      }
    });
    fireEvent.click(getByText(appointment, 'Save'));
    expect(getByText(appointment, 'SAVING')).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, 'Error'));
    expect(getByText(appointment, 'Unable to save appointment')).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, 'Close'));
    expect(getByPlaceholderText(appointment, /enter student name/i)).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const {container} = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(container, 'appointment').find(appointment => 
      queryByText(appointment, 'Archie Cohen')
    );
    fireEvent.click(getByAltText(appointment, 'Delete'));
    expect(getByText(appointment, 'Are you sure you would like to delete?')).toBeInTheDocument();
    fireEvent.click(getByText(appointment, 'Confirm'));
    expect(getByText(appointment, 'DELETING')).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, 'Error'));
    expect(getByText(appointment, 'Unable to delete appointment')).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, 'Close'));
    expect(getByText(appointment, 'Archie Cohen')).toBeInTheDocument();
  });
});