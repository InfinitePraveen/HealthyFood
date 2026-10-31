# Deployment Runbook

## Local development

Use `infra/docker-compose.yml` for the local PostgreSQL database. Run the API, web application, and clinical engine as separate processes using the commands in the root README.

## Production target architecture

The source blueprint recommends AWS under an executed BAA, using separate dev/staging/prod accounts; VPC private subnets; ECS Fargate; ALB/WAF; KMS; Secrets Manager; CloudTrail; GuardDuty; Config; encrypted S3; and Terraform.

Do not deploy this starter directly with PHI.

## Required production work

1. Create AWS landing zone and separate accounts.
2. Validate that each selected AWS service and configuration is covered by the organization's BAA and current compliance requirements.
3. Add Terraform modules, private networking, WAF, KMS key hierarchy, secrets, and least-privilege IAM.
4. Add managed PostgreSQL with Multi-AZ, PITR, RLS, pgaudit, and tested backups.
5. Add container build, SBOM, image signing, vulnerability scanning, and deployment approvals.
6. Add observability with PHI scrubbing and alerting.
7. Run threat modeling, penetration testing, DR exercises, and clinical validation.
8. Deploy to a synthetic-data staging environment first.

## Rollback

Use immutable image tags and infrastructure revisions. Roll back the application image and compatible schema migration using a reviewed runbook. Clinical rule versions must be independently pinnable and historical decisions reproducible.
