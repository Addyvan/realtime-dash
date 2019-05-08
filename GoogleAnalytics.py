from apiclient.discovery import build
from oauth2client.service_account import ServiceAccountCredentials
import os

def get_service(api_name, api_version, scopes, key_file_location):
    """Get a service that communicates to a Google API.

    Args:
        api_name: The name of the api to connect to.
        api_version: The api version to connect to.
        scopes: A list auth scopes to authorize for the application.
        key_file_location: The path to a valid service account JSON key file.

    Returns:
        A service that is connected to the specified API.
    """

    credentials = ServiceAccountCredentials.from_json_keyfile_name(
            key_file_location, scopes=scopes)

    # Build the service object.
    service = build(api_name, api_version, credentials=credentials)

    return service

def createService():

    if os.path.isfile('client_secrets.json') == False:
            # Create the file from the env
            with open('client_secrets.json', 'w') as f:
                f.write(os.environ['GA-CLIENT-SECRETS'])

    scope = 'https://www.googleapis.com/auth/analytics.readonly'
    key_file_location = 'client_secrets.json'
    return get_service(
            api_name='analytics',
            api_version='v3',
            scopes=[scope],
            key_file_location=key_file_location)

def getActiveUsers(service, platform):
    # Define the auth scopes to request

    if platform == "gccollab":
      ids = "ga:127642570"
    elif platform == "gcconnex":
      ids = "ga:55943097"
    else:
      ids = "ga:39673253"
    # Authenticate and construct service

    data = service.data().realtime().get(
            ids=ids,
            metrics='rt:activeUsers',
            dimensions='rt:medium').execute()

    return data['totalsForAllResults']['rt:activeUsers']