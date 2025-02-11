import { Button } from '@react-email/button';
import { Column } from '@react-email/column';
import { Img } from '@react-email/img';
import { Row } from '@react-email/row';
import { Section } from '@react-email/section';
import { Tailwind } from '@react-email/tailwind';
import { Text } from '@react-email/text';

type EmailProps = {
  username: string;
  newEmail: string;
  url: string;
};

export default function UpdateEmail({ username, newEmail, url }: EmailProps) {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              'primary': '#18181b',
              'primary-foreground': '#fafafa',
            },
          },
        },
      }}
    >
      <Section>
        <Row>
          <Column>
            <Img
              src="https://raw.githubusercontent.com/ezeparziale/quark/main/public/logo/logo-light.png"
              alt="logo"
              width="32"
              height="32"
            />
          </Column>
        </Row>
      </Section>
      <Text>
        Hello
        {username}
        ,
      </Text>
      <Text>
        To change your email to
        {newEmail}
        {' '}
        please click the following link:
      </Text>
      <Button
        href={url}
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        Change email account
      </Button>
    </Tailwind>
  );
}
