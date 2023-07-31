import NProgress from 'nprogress';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';
import Page from '../components/Page';
import '../components/styles/nprogress.css';
import withData from '../lib/withData';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.start());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};

  // This pattern is used to get the pageProps from the page component
  // if it has any. This is useful for getting the query variables from
  // the URL.
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  // This exposes the query to the user
  pageProps.query = ctx.query;

  return { pageProps };
};

export default withData(MyApp);
