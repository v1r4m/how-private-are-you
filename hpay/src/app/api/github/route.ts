import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";


export async function GET(
  req: NextApiRequest,
) {
  const githubApiUrl = 'https://api.github.com/graphql';
  const githubToken = process.env.GITHUB_TOKEN;
  console.log(req);
  const userName = 'v1r4m';
//  const userName = req.body.userName;

  const graphqlQuery = `
    query ($userName: String!) {
      user(login: $userName) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
          commitContributionsByRepository {
            repository {
              name
              owner {
                login
              }
              isPrivate
            }
            contributions {
              totalCount
            }
          }
        }
      }
    }
  `;

  const variables = { userName };
  const requestData = {
    query: graphqlQuery,
    variables,
  };

  try {
    const response = await axios.post(
      githubApiUrl,
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `bearer ${githubToken}`
        }
      }
    );

    const data = response.data;
    const totalCommit = data.data.user.contributionsCollection.contributionCalendar.totalContributions;
    let totalPublicCommit = 0;
    for (const commitContributionsByRepository of data.data.user.contributionsCollection.commitContributionsByRepository) {
      if(commitContributionsByRepository.repository.isPrivate === false) {
        totalPublicCommit += commitContributionsByRepository.contributions.totalCount;
      }
    }

    const result = {
      totalCommit,
      totalPublicCommit
    };

    return Response.json(result);
  } catch (e) {
    console.log(e);
  }
}