// src/components/IssuesList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IssuesList = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssues = async () => {
      const baseURL = process.env.REACT_APP_JIRA_BASE_URL;
      const token = process.env.REACT_APP_JIRA_API_TOKEN;
      const projectKey = process.env.REACT_APP_JIRA_PROJECT_KEY;
      
      try {
        const response = await axios.get(`${baseURL}/rest/api/3/search?jql=project=${projectKey}`, {
          headers: {
            'Authorization': `Basic ${btoa(`email:${token}`)}`,
            'Accept': 'application/json'
          }
        });
        setIssues(response.data.issues);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Jira Issues</h1>
      <table>
        <thead>
          <tr>
            <th>Issue Key</th>
            <th>Summary</th>
            <th>Issue Type</th>
            <th>Status</th>
            <th>Assignee</th>
          </tr>
        </thead>
        <tbody>
          {issues.map(issue => (
            <tr key={issue.id}>
              <td>{issue.key}</td>
              <td>{issue.fields.summary}</td>
              <td>{issue.fields.issuetype.name}</td>
              <td>{issue.fields.status.name}</td>
              <td>{issue.fields.assignee ? issue.fields.assignee.displayName : 'Unassigned'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssuesList;