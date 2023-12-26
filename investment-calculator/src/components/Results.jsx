import { calculateInvestmentResults, formatter } from "../util/investment";

export default function Results({ values }) {
  const results = calculateInvestmentResults(values);

  let totalInterest = 0;

  return (
    <table id="result">
      <thead>
        <tr key="header">
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {results.map((column) => (
          <tr key={"rows-" + column.year}>
            <td>{column.year}</td>
            <td>{formatter.format(column.valueEndOfYear)}</td>
            <td>{formatter.format(column.interest)}</td>
            <td>{formatter.format((totalInterest += column.interest))}</td>
            <td>
              {formatter.format(
                values.initialInvestment + column.year * column.annualInvestment
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
