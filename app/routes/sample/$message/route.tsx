import MessageView from '@routes/sample/$message/MeesageView';
export { loader } from '@routes/sample/$message/MeesageView';

export default function SampleMessage() {
  return (
    <div>
      <h1>Message</h1>
      <MessageView />
    </div>
  );
}
