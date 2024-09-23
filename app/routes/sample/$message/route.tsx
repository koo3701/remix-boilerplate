import { Link } from '@remix-run/react';

import { MdArrowBackIos } from 'react-icons/md';

import Button from '@components/Elements/Button';

import MessageView from '@routes/sample/$message/MeesageView';
export { loader } from '@routes/sample/$message/MeesageView';

export default function SampleMessage() {
  return (
    <div>
      <div className="w-96 rounded-md border-2 border-primary p-4">
        <MessageView />
      </div>
      <Link to="/sample">
        <Button className="mt-4" icon={MdArrowBackIos}>
          Back
        </Button>
      </Link>
    </div>
  );
}
