import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest, exchangeCodeAsync, revokeAsync, ResponseType, AccessTokenRequestConfig, TokenResponse } from 'expo-auth-session';
import { Button, Alert } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const clientId = '7h26i45c6h08bmu45d4nb9ufs6';
const userPoolUrl = 'https://ye.auth.sa-east-1.amazoncognito.com';
const redirectUri = 'https://localhost:19200';

export default function App() {
    const [authTokens, setAuthTokens] = React.useState<TokenResponse | null>(null);
    const discoveryDocument = React.useMemo(() => ({
        authorizationEndpoint: userPoolUrl + '/oauth2/authorize',
        tokenEndpoint: userPoolUrl + '/oauth2/token',
        revocationEndpoint: userPoolUrl + '/oauth2/revoke',
    }), []);

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId,
            responseType: ResponseType.Code,
            redirectUri,
            usePKCE: true,
        },
        discoveryDocument
    );

    React.useEffect(() => {
        const exchangeFn = async (exchangeTokenReq: AccessTokenRequestConfig) => {
            try {
                const exchangeTokenResponse: TokenResponse = await exchangeCodeAsync(
                    exchangeTokenReq,
                    discoveryDocument
                );
                setAuthTokens(exchangeTokenResponse);
            } catch (error) {
                console.error(error);
            }
        };
        if (response && 'error' in response) {
            Alert.alert(
                'Authentication error',
                response.params.error_description || 'something went wrong'
            );
            return;
        }
        if (response && response.type === 'success' && request?.codeVerifier) {
            exchangeFn({
                clientId,
                code: response.params.code,
                redirectUri,
                extraParams: {
                    code_verifier: request.codeVerifier,
                },
            });
        }
    }, [discoveryDocument, request, response]);

    const logout = async () => {
        if (!authTokens || !authTokens.refreshToken) {
            return;
        }
        const revokeResponse = await revokeAsync(
            {
                clientId: clientId,
                token: authTokens.refreshToken,
            },
            discoveryDocument
        );
        if (revokeResponse) {
            setAuthTokens(null);
        }
    };
    console.log('authTokens: ' + JSON.stringify(authTokens));
    return authTokens ? (
        <Button title="Logout" onPress={() => logout()} />
    ) : (
        <Button disabled={!request} title="Login" onPress={() => promptAsync()} />
    );
}
