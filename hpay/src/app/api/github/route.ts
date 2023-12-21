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
  console.log(githubToken);

  const graphqlQuery = `
    query ($userName: String!) {
      user(login: $userName) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
          commitContributionsByRepository {
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

    return Response.json(response.data); //가공해서 클라로 보내야함
  } catch (e) {
    console.log(e);
  }
}